import React from 'react'

import styles from './Status.module.css'

function Status({ status }) {
    return (
        <div className={styles.container}>
            <p className={styles.text}>{status}</p>
        </div>
    )
}

export default Status
