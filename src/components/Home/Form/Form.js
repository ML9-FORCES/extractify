import React from 'react'

import styles from './Form.module.css'

function Form() {
    return (
        <div className={styles.container}>
            <input type="file" name="file" id="file" />
        </div>
    )
}

export default Form
