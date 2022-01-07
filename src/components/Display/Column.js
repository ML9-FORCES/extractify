import React, { useState, memo } from 'react'
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
        <div onClick={props.onToggle} className={`${styles.container} ${props.isFocused ? styles.focus : styles.nofocus}`}>
            <div className={styles.box}>
                <div className={styles.key}>{props.text}</div>
                <div className={styles.value}> <List list={values} /></div>
            </div>
            <div className={styles.box}>
                <div className={styles.key}>Label Confidence Score:</div>
                <div className={styles.value}>{props.label_cfscore}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.key}>Linking Confidence Score:</div>
                <div className={styles.value}>
                    <List list={linking_cfscore} />
                </div>
            </div>
        </div>
    )
}

const List = memo((props) => (
    <>
        {
            props.list.map((score, key) =>
                <span key={key}>
                    {score}
                </span>
            )
        }
    </>
))

export default memo(Column)
