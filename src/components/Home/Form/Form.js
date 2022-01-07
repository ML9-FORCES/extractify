import React, { useState } from 'react'

import styles from './Form.module.css'
import FormUpload from './FormUpload';

function Form() {
    const [option, setOption] = useState("");

    const optionHandler = (opt) => {
        setOption(opt);
    }

    console.log(option)
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Choose file type:</h1>
            <form className={styles.form}>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("jpeg") }} />
                    <span>JPEG</span>
                </label>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("jpg") }} />
                    <span>JPG</span>
                </label>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("png") }} />
                    <span>PNG</span>
                </label>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("pdf") }} />
                    <span>PDF</span>
                </label>
            </form>
            <FormUpload option={option} />
        </div>
    )
}

export default Form
