import React from 'react'

import styles from './Intro.module.css';
import extractify from '../../../images/extractify.png'

function Intro() {

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <img className={styles.image} src={extractify} alt="extractify" />
                <span className={styles.textlarge}>Extractify</span>
                <span className={styles.textmedium}>Extraction of Text at its Best Level</span>
                <span className={styles.textsmall}>Let's Go</span>
            </div>
        </div>
    )
}

export default Intro
