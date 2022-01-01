import React from 'react'

import styles from './About.module.css'
import aboutImage from '../../../images/about.jpg';

function About() {
    return (
        <div>
            <img className={styles.image} src={aboutImage} alt="About" />
        </div>
    )
}

export default About
