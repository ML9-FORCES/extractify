import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormUploader from './FormUploader';
import styles from './FormUpload.module.css'

import { ContextImage } from '../../../App';

function FormUpload(props) {
    let url = '';
    const navigate = useNavigate();
    const { selectedImageFile, setSelectedImageFile } = useContext(ContextImage)
    const [selectedJSONFile, setSelectedJSONFile] = useState(null);


    const submitForm = (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("pdf_name", selectedImageFile);

        // Change pdf to image format
        if (props.option === "pdf") {
            url = 'http://127.0.0.1:5000/pdf_converter/'
            axios
                .post(url, formData)
                .then((res) => {
                    alert("File Upload success");
                })
                .catch((err) => alert("File Upload Error"));
        }

        // upload the JSON file
        url = 'http://127.0.0.1:5000/api';
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };

        const reader = new FileReader()
        reader.onload = async (e) => {
            console.log(e.target.result)
            reader.readAsText(selectedJSONFile)
            JSON.parse(reader)
        };

        axios
            .post(url, reader, options)
            .then((res) => {
                navigate('/display')
            })
            .catch((err) => alert("File Upload Error"));

    }

    return (
        <form id={styles.fileUploadForm} className={`${styles.uploader} ${props.option ? '' : styles.disable}`}>
            {/* <input
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.files[0])} id='fileUpload' type="file" name="fileUpload" accept={`.${props.option}`} disabled={props.option ? false : true} /> */}

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
                                <div>Select Image</div>
                                <div id={styles.notimage} className={styles.hidden}>Please select an image</div>
                                <span id={styles.fileUploadBtn} className={`${styles.btn} ${styles.btnPrimary}`}>Select image</span>
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
