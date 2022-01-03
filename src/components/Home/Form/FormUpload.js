import React, { useState } from 'react'
import axios from 'axios'
import FormUploader from './FormUploader';
import styles from './FormUpload.module.css'

function FormUpload(props) {
    const [selectedFile, setSelectedFile] = useState(null);

    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("pdf_name", selectedFile);

        axios
            .post('http://127.0.0.1:8000/converter/pdftoimg/', formData)
            .then((res) => {
                alert("File Upload success");
            })
            .catch((err) => alert("File Upload Error"));
    };

    return (
        <form id={styles.fileUploadForm} className={`${styles.uploader} ${props.option ? '' : styles.disable}`}>
            {/* <input
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.files[0])} id='fileUpload' type="file" name="fileUpload" accept={`.${props.option}`} disabled={props.option ? false : true} /> */}

            <label htmlFor="fileUpload" id="file-drag" >
                <img id={styles.fileImage} src="#" alt="Preview" className={styles.hidden} />
                <div id={styles.start}>
                    <i className={`${styles.fa} ${styles.faDownload}`} aria-hidden="true"></i>
                    <div>Select a file or drag here</div>
                    <div id={styles.notimage} className={styles.hidden}>Please select an image</div>
                    <span id={styles.fileUploadBtn} className={`${styles.btn} ${styles.btnPrimary}`}>Select a file</span>
                </div>
                <FormUploader
                    id='fileUpload'
                    accept={`.${props.option}`} disabled={props.option ? false : true}
                    onFileSelectSuccess={(file) => setSelectedFile(file)}
                    onFileSelectError={({ error }) => alert(error)}
                />
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={(e) => submitForm(e)}>Submit</button>

                <div id={styles.response} className={styles.hidden}>
                    <div id={styles.messages}></div>
                    <progress className={styles.progress} id={styles.fileProgress} value="0">
                        <span>0</span>%
                    </progress>
                </div>
            </label>
        </form>
    )
}

export default FormUpload
