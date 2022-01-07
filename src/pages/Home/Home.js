import React, { useState, useEffect, useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import Intro from '../../components/Home/Intro/Intro';
import About from '../../components/Home/About/About';
import Form from '../../components/Home/Form/Form';


import { ContextImage } from '../../App';

import styles from './Home.module.css';

function Home() {
    const [showIntro, setIntro] = useState(true);

    const { setSelectedImageFile } = useContext(ContextImage)

    const IntroDisplayHandler = () => {
        setIntro(false);
    }

    useEffect(() => {
        setTimeout(IntroDisplayHandler, 1000)
        setSelectedImageFile(null)
    }, [])

    return (
        <HelmetProvider>
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
        </HelmetProvider>
    )
}

export default Home
