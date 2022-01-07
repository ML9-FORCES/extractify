import React, { useEffect, useState, createContext, useMemo, memo } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Display.module.css'
import Column from '../../components/Display/Column'
import Navbar from '../../components/common/Navbar/Navbar'
import Canvas from '../../components/Display/Canvas'

export const CanvasContext = createContext(null);

function Display() {
    // Navigation Hook
    const navigate = useNavigate();
    const { state } = useLocation();
    const { raw_data, img } = state;


    useEffect(() => {
        getKeysAndOthers();
    }, []);

    // Creating context for Canvas
    const [ctx, setCtx] = useState(null);
    const value = useMemo(
        () => ({ ctx, setCtx }),
        [ctx]
    );
    const [keys, setKeys] = useState([])
    const [others, setOthers] = useState([])
    const [data, setData] = useState([])

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
                if (chunk[object].label[0] === "other") {
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

    const [isFocused, setFocus] = useState('')

    const clearCanvas = (chunk, key) => {
        const image = new Image();
        image.src = img;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, 800, 1000);
            selectBoxHandler(chunk, key);
        };

    }
    const selectBoxHandler = (chunk, key) => {
        let params = chunk.box;
        setFocus(chunk.id)
        drawKey(params, chunk)
    }


    return (
        <HelmetProvider>
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
                    img ?
                        <div className={styles.container}>
                            <Canvas imgPath={img} width={400} height={600} />

                            <div className={styles.columns}>
                                {
                                    keys.map((chunk, key) => {
                                        console.log(chunk)
                                        return (
                                            <Column
                                                key={key}
                                                data={data}
                                                chunk={chunk}
                                                text={chunk.text}
                                                id={chunk.id}
                                                label_cfscore={chunk.label[1]}
                                                isFocused={isFocused === chunk.id}
                                                onToggle={() => clearCanvas(chunk, key)}
                                            />
                                        )
                                    }
                                    )
                                }
                                {
                                    others.map((chunk, key) =>
                                        <Column
                                            key={key}
                                            data={data}
                                            chunk={chunk}
                                            text={chunk.text}
                                            id={chunk.id}
                                            label_cfscore={chunk.label[1]}
                                            isFocused={isFocused === chunk.id}
                                            onToggle={() => clearCanvas(chunk, key)}
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
        </HelmetProvider>
    )
}

export default memo(Display)
