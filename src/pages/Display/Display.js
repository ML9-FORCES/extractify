import React, { useEffect, useState, createContext, useContext, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

import styles from './Display.module.css'
import Doc from '../../images/doc.png'
import Column from '../../components/Display/Column'
import Navbar from '../../components/common/Navbar/Navbar'
import Canvas from '../../components/Display/Canvas'
import { ContextImage } from '../../App'

export const CanvasContext = createContext(null);

function Display() {
    // Navigation Hook
    const navigate = useNavigate();
    const { state } = useLocation();
    const { raw_data } = state;


    useEffect(() => {
        getKeysAndOthers();
    }, []);

    // Creating context for Canvas
    const [ctx, setCtx] = useState(null);
    const value = useMemo(
        () => ({ ctx, setCtx }),
        [ctx]
    );
    // Keys, values,data
    const { selectedImageFile, setSelectedImageFile } = useContext(ContextImage);
    const [keys, setKeys] = useState([])
    const [others, setOthers] = useState([])
    const [data, setData] = useState([])

    setSelectedImageFile(Doc)

    const buttonHandler = () => {
        navigate('/');
    }

    const getKeysAndOthers = () => {
        data.push(raw_data.form)
        let tempArr = [];
        let tempArr1 = [];

        // Extracting keys 
        data.forEach((chunk) => {
            for (let object in chunk) {
                if (chunk[object].label[0] === "key") {
                    tempArr.push(chunk[object])
                }
                if (chunk[object].label[0] === "others") {
                    tempArr1.push(chunk[object])
                }
            }
        })
        setKeys(tempArr)
        setOthers(tempArr1)

    }

    // Draw Keys
    const drawKey = (params, chunk) => {
        const [first, second, third, fourth] = params;

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.rect(first, second, third - first, fourth - second);
        ctx.stroke();

        chunk.linking.forEach((link) => {
            let tempID = link[1];

            data.forEach((chunk) => {
                for (let object in chunk) {
                    if (chunk[object].id === tempID) {
                        let valueRectParams = chunk[object].box
                        // valueRectParams.forEach((e) => e = e / 4)
                        drawValues(valueRectParams);
                    }
                }
            })

        })
    }

    // Draw Values
    const drawValues = (valueRectparams) => {
        const [first, second, third, fourth] = valueRectparams;

        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.rect(first, second, third - first, fourth - second);
        ctx.stroke();

    }
    const selectBoxHandler = (chunk) => {
        console.log(chunk)
        let params = chunk.box;
        // params.forEach((e) => e = e / 4)
        drawKey(params, chunk)

    }


    return (
        <>
            <Helmet>
                <title>Display</title>
            </Helmet>
            <Navbar />
            <div className={styles.instructions}>
                <div className={styles.inst_wrapper}>
                    <div className={styles.red}></div>
                    <span className={styles.inst_text}>Key</span>
                </div>
                <div className={styles.inst_wrapper}>
                    <div className={styles.green}></div>
                    <span className={styles.inst_text}>Values</span>
                </div>
            </div>
            <CanvasContext.Provider value={value}>
                {
                    selectedImageFile ?
                        <div className={styles.container}>
                            <Canvas keys={keys} data={data} imgPath={selectedImageFile} width={400} height={600} />
                            {/* <img className={styles.image} src={selectedImageFile} alt="Doc" /> */}
                            <div className={styles.columns}>
                                {
                                    keys.map((chunk, key) =>
                                        <Column
                                            data={data}
                                            key={key}
                                            chunk={chunk}
                                            text={chunk.text}
                                            id={chunk.id}
                                            label_cfscore={chunk.label[1]}
                                            onClick={() => selectBoxHandler(chunk)}
                                        />
                                    )
                                }
                                {
                                    others.map((chunk, key) =>
                                        <Column
                                            data={data}
                                            key={key}
                                            chunk={chunk}
                                            text={chunk.text}
                                            id={chunk.id}
                                            label_cfscore={chunk.label[1]}
                                            onClick={() => selectBoxHandler(chunk.id)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        :
                        <>
                            <h1 style={{ color: '#f24976', width: '100%', height: '4vh', margin: '3rem' }}>Please select a image first</h1>
                            <button className={styles.button} onClick={buttonHandler}>Select an Image</button>
                        </>
                }
            </CanvasContext.Provider>
        </>
    )
}

export default Display
