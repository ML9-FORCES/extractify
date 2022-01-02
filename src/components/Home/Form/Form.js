import React from 'react'

import styles from './Form.module.css'

function Form() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Select the type of file</h1>
            <form className={styles.form}>
                <label className={styles.label}>
                    <input type="radio" name="radio" checked />
                    <span>JPEG</span>
                </label>
                <label className={styles.label}>
                    <input type="radio" name="radio" />
                    <span>PNG</span>
                </label>
                <label className={styles.label}>
                    <input type="radio" name="radio" />
                    <span>PDF</span>
                </label>
            </form>
            <input type="file" name="file" id="file" />
        </div>
    )
}

export default Form
