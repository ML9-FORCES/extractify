import React from 'react'

import styles from './Navbar.module.css';
import Logo from '../../../images/logo.png';

function Navbar() {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={Logo} alt="Logo" />
            <span className={styles.heading}>Extractify</span>
        </div>
    )
}

export default Navbar
