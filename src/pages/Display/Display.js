import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Doc from '../../images/doc.png'
import styles from './Display.module.css'
import Column from '../../components/Display/Column'
import Navbar from '../../components/common/Navbar/Navbar'

function Display() {
    const [keys, setKeys] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        getKeys();
    }, []);

    const getKeys = () => {
        axios
            .get('http://localhost:8000/output/')
            .then((res) => {
                data.push(res.data.form)
                let tempArr = [];
                // Extracting keys 
                data.forEach((chunk) => {
                    for (let object in chunk) {
                        if (chunk[object].label[0] === "key") {
                            tempArr.push(chunk[object])
                        }
                    }
                })
                setKeys(tempArr)

            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (
        <>
            <Helmet>
                <title>Display</title>
            </Helmet>
            <Navbar />
            <div className={styles.container}>
                <img className={styles.image} src={Doc} alt="Doc" />
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
                                linking_cfscore={0}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Display
