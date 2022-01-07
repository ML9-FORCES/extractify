import React, { Fragment, useEffect, useState } from 'react'
import styles from './ProgressPage.module.css'

import ProgressBar from '../../components/common/ProgressBar/ProgressBar';
import Status from '../../components/common/ProgressBar/Status'

import ModelLoading from '../../images/loadmodel.png'
import DataPreProcessing from '../../images/data.png'
import Classification from '../../images/classification.png'
import Linking from '../../images/linking.png'
import Finishing from '../../images/finish.png'

function ProgressPage() {
    const [value, updateValue] = useState(0)

    const images = [ModelLoading, DataPreProcessing, Classification, Linking, Finishing]

    const steps = [
        'Model Loading',
        'Data Preprocessing',
        'Classification',
        'Linking',
        'Finishing'
    ]

    const [step, setStep] = useState(steps[0])
    const [image, setImage] = useState(images[0])

    useEffect(() => {
        const interval = setInterval(() => {
            updateValue(oldValue => {
                const newValue = oldValue + 10;
                if (newValue === 100) {
                    clearInterval(interval)
                }
                return newValue
            })
        }, 2600)

        let i = 0;
        const imageInterval = setInterval(() => {
            i = i + 1;
            if (steps.length === i) {
                clearInterval(imageInterval)
                return 1
            }
            setStep(steps[i], setImage(images[i]))
        }, 8000)
    }, []);

    return (
        <>
            {
                value === 100 ?
                    ''
                    :
                    <div className={styles.container}>
                        <div className={styles.StatusContainer} >
                            <img className={styles.image} src={image} alt="icon" />
                            <Status status={step} />
                            <ProgressBar bgcolor={"#6a1b9a"} value={value} />
                        </div>
                    </div>
            }
        </>
    )
}

export default ProgressPage