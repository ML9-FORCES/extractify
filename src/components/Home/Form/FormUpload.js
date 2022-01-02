import React from 'react'

import styles from './FormUpload.module.css'

function FormUpload(props) {

    return (
        <form id={styles.fileUploadForm} className={`${styles.uploader} ${props.option ? '' : styles.disable}`}>
            <input id='fileUpload' type="file" name="fileUpload" accept={`.${props.option}`} disabled={props.option ? false : true} />

            <label htmlFor="fileUpload" id="file-drag">
                <img id={styles.fileImage} src="#" alt="Preview" className={styles.hidden} />
                <div id={styles.start}>
                    <i className={`${styles.fa} ${styles.faDownload}`} aria-hidden="true"></i>
                    <div>Select a file or drag here</div>
                    <div id={styles.notimage} className={styles.hidden}>Please select an image</div>
                    <span id={styles.fileUploadBtn} className={`${styles.btn} ${styles.btnPrimary}`}>Select a file</span>
                </div>
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
