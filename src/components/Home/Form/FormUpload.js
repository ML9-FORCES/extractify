import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormUploader from './FormUploader';
import styles from './FormUpload.module.css'

import { ContextImage } from '../../../App';
import ProgressPage from '../../../pages/ProgressPage/ProgressPage';

function FormUpload(props) {
    let url = '';
    const navigate = useNavigate();
    const { selectedImageFile, setSelectedImageFile } = useContext(ContextImage)
    const [selectedJSONFile, setSelectedJSONFile] = useState(null);
    const [showProgress, setProgress] = useState(false)


    const submitForm = (e) => {
        e.preventDefault()
        setProgress(true)

        // If it is in PDF format
        // Upload the PDF for conversion
        if (props.option === "pdf") {

            // Change pdf to image format
            const formData = new FormData();
            formData.append("pdf", selectedImageFile);

            var config = {
                method: 'post',
                url: 'http://127.0.0.1:5000/pdf_converter',
                headers: {
                    'Content-Type': 'application/pdf'
                },
                data: formData
            };
            axios(config)
                .then((res) => {

                    // Base 64 encoded string
                    let imag = `data:image/jpg;base64,${res.data.status}`
                    console.log(imag)
                    // upload the JSON file
                    url = 'http://127.0.0.1:5000/api';
                    const reader = new FileReader()
                    reader.onload = async (e) => {
                        let data = e.target.result
                        var config = {
                            method: 'post',
                            url: 'http://127.0.0.1:5000/api',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios(config)
                            .then(function (response) {
                                navigate('/display', { state: { raw_data: response.data, img: imag } })
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    reader.readAsText(selectedJSONFile)
                })
                .catch((err) => alert(err));
        }

        // If it is in Image Format
        else {

            // upload the JSON file
            url = 'http://127.0.0.1:5000/api';
            const reader = new FileReader()
            reader.onload = async (e) => {
                let data = e.target.result
                var config = {
                    method: 'post',
                    url: 'http://127.0.0.1:5000/api',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        // Change the uploaded to base64
                        const imgReader = new FileReader();
                        imgReader.onload = async (e) => {
                            let img;
                            img = e.target.result;
                            navigate('/display', { state: { raw_data: response.data, img: img } })
                        }

                        if (selectedImageFile) {
                            imgReader.readAsDataURL(selectedImageFile)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            reader.readAsText(selectedJSONFile)
        }
    }

    return (
        <form id={styles.fileUploadForm} className={`${styles.uploader} ${props.option ? '' : styles.disable}`}>
            {
                showProgress ? <ProgressPage /> : ''
            }

            {/* Input Image */}
            {
                selectedImageFile
                    ?
                    <>
                        {/* Input JSON File */}
                        <label htmlFor="JSONUpload" id="file-drag" >
                            <img id={styles.fileImage} src="#" alt="Preview" className={styles.hidden} />
                            <div id={styles.start}>
                                <i className={`${styles.fa} ${styles.faDownload}`} aria-hidden="true"></i>
                                <div>Select JSON file</div>
                                <div id={styles.notimage} className={styles.hidden}>Please select a .json file</div>
                                {
                                    selectedJSONFile ?
                                        ''
                                        :
                                        <span id={styles.fileUploadBtn} className={`${styles.btn} ${styles.btnPrimary}`}>Select JSON</span>

                                }
                            </div>
                            <FormUploader
                                id='JSONUpload'
                                accept={'application/JSON'} disabled={props.option ? false : true}
                                onFileSelectSuccess={(file) => setSelectedJSONFile(file)}
                            // onFileSelectError={({ error }) => alert(error)}
                            />
                            {
                                selectedJSONFile
                                    ?
                                    <>
                                        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={(e) => submitForm(e)}>Submit</button>
                                    </>
                                    : ''
                            }
                        </label>
                    </>
                    :
                    <>
                        {/* Input Image File */}
                        <label htmlFor="imageUpload" id="file-drag" >
                            <img id={styles.fileImage} src="#" alt="Preview" className={styles.hidden} />
                            <div id={styles.start}>
                                <i className={`${styles.fa} ${styles.faDownload}`} aria-hidden="true"></i>
                                <div>Select {props.option === 'pdf' ? 'PDF' : 'Image'}</div>
                                <div id={styles.notimage} className={styles.hidden}>Please select {props.option === 'pdf' ? 'PDF' : 'Image'}</div>
                                <span id={styles.fileUploadBtn} className={`${styles.btn} ${styles.btnPrimary}`}>Select {props.option === 'pdf' ? 'PDF' : 'Image'}</span>
                            </div>
                            <FormUploader
                                id='imageUpload'
                                accept={`.${props.option}`} disabled={props.option ? false : true}
                                onFileSelectSuccess={(file) => setSelectedImageFile(file)}
                            // onFileSelectError={({ error }) => alert(error)}
                            />
                        </label>
                    </>
            }
        </form>
    )
}

export default FormUpload
