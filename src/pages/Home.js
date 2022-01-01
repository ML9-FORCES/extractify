import React, { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar/Navbar'
import Footer from '../components/common/Footer/Footer'
import Intro from '../components/Home/Intro/Intro'
import About from '../components/Home/About/About';

function Home() {
    const [showIntro, setIntro] = useState(true);

    const IntroDisplayHandler = () => {
        setIntro(false);
    }

    useEffect(() => {
        setTimeout(IntroDisplayHandler, 4000)
    }, [])

    return (
        <div>
            {
                showIntro ? <Intro />
                    :
                    <>
                        <Navbar />
                        <About />
                        <Footer />
                    </>
            }

        </div>
    )
}

export default Home
