import React from 'react'

import styles from './Intro.module.css';

function Intro() {

    return (
        <div className={styles.container}>
            <span className={styles.textlarge}>Extraction of Text</span>
            <span className={styles.textmedium}>At its best level</span>
            <span className={styles.textsmall}>Let's Go</span>
        </div>
    )
}

export default Intro
