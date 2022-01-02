import React, { useState } from 'react'

import styles from './Form.module.css'

function Form() {
    const [option, setOption] = useState("JPEG");

    const optionHandler = (opt) => {
        setOption(opt);
    }

    console.log(option)
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Select the type of file</h1>
            <form className={styles.form}>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("JPEG") }} />
                    <span>JPEG</span>
                </label>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("PNG") }} />
                    <span>PNG</span>
                </label>
                <label className={styles.label} >
                    <input type="radio" name="radio" onClick={() => { optionHandler("PDF") }} />
                    <span>PDF</span>
                </label>
            </form>
            <input type="file" name="file" id="file" />
        </div>
    )
}

export default Form
