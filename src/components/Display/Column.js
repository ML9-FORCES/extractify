import React, { useState } from 'react'
import styles from './Column.module.css'

function Column(props) {
    const [values, setValues] = useState([])
    const [linking_cfscore, setScores] = useState([])

    const findValues = () => {
        props.chunk.linking.forEach((link) => {
            linking_cfscore.push(link[2])
            props.data.forEach((chunk) => {
                for (let obj in chunk) {
                    if (chunk[obj].id === link[1])
                        values.push(chunk[obj].text)
                }
            })
        })
    }


    findValues()

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.key}>{props.text}</div>
                <div className={styles.value}>{values.map((value) =>
                    <>
                        <span>
                            {value}
                        </span>
                        ,
                    </>
                )}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.key}>Label Confidence Score:</div>
                <div className={styles.value}>{props.label_cfscore}</div>
            </div>
            {/* <div className={styles.box}>
                <div className={styles.key}>Linking:</div>
                <div className={styles.value}>From: {props.link_from} To: {props.link_to}</div>
            </div> */}
            <div className={styles.box}>
                <div className={styles.key}>Linking Confidence Score:</div>
                <div className={styles.value}>
                    {
                        linking_cfscore.map((score) =>
                            <span>
                                {score}
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Column
