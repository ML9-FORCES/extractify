import React, { useEffect, useState, createContext, useContext, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
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
        axios
            .get('http://localhost:8000/output/')
            .then((res) => {
                data.push(res.data.form)
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

            })
            .catch((e) => {
                console.log(e)
            })
    }

    // Draw Keys
    const drawKey = (params, context, chunk) => {
        const [first, second, third, fourth] = params;

        context.beginPath();
        context.strokeStyle = "red";
        context.rect(first, second, third, fourth);
        context.stroke();

        chunk.linking.forEach((link) => {
            let tempID = link[1];

            data.forEach((chunk) => {
                for (let object in chunk) {
                    if (chunk[object].id === tempID) {
                        let valueRectParams = chunk[object].box
                        drawValues(context, valueRectParams);
                    }
                }
            })

        })
    }

    // Draw Values
    const drawValues = (valueRectparams, context) => {
        const [first, second, third, fourth] = valueRectparams;

        context.beginPath();
        context.rect(first, second, third, fourth);
        context.stroke();

    }
    const selectBoxHandler = (chunk) => {
        let params = chunk.box;
        drawKey(params, chunk)
    }


    return (
        <>
            <Helmet>
                <title>Display</title>
            </Helmet>
            <Navbar />
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
                                            onClick={() => selectBoxHandler(chunk.id)}
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
