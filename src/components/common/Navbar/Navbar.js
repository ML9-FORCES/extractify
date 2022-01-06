import React from 'react'
import { useNavigate } from 'react-router-dom';

import styles from './Navbar.module.css';
import Logo from '../../../images/logo.png';

function Navbar() {
    const navigate = useNavigate();

    const buttonHandler = () => {
        navigate('/');
    }
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={Logo} alt="Logo" />
                <span className={styles.heading}>Extractify</span>
            </div>
            <button className={styles.button} onClick={buttonHandler}>Upload</button>
        </div>
    )
}

export default Navbar
