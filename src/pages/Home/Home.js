import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';

import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import Intro from '../../components/Home/Intro/Intro';
import About from '../../components/Home/About/About';
import Form from '../../components/Home/Form/Form';

import styles from './Home.module.css';

function Home() {
    const [showIntro, setIntro] = useState(true);

    const IntroDisplayHandler = () => {
        setIntro(false);
    }

    useEffect(() => {
        setTimeout(IntroDisplayHandler, 1000)
    }, [])

    return (
        <div>
            <Helmet>
                <title>Home | Extractify</title>
            </Helmet>
            {
                showIntro ? <Intro />
                    :
                    <>
                        <Navbar />
                        <div className={styles.container}>
                            <Form />
                            <About />
                        </div>
                        <Footer />
                    </>
            }

        </div>
    )
}

export default Home
