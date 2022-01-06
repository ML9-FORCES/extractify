import React from 'react'

function FormUploader({ id, name, accept, disabled, onFileSelectError, onFileSelectSuccess }) {
    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        // if (file.size > 10000000)
        //     onFileSelectError({ error: "File size cannot exceed more than 10MB" });
        // else 
        onFileSelectSuccess(file);
    }
    return (
        <div className="file-uploader">
            <input type="file" id={id} disabled={disabled} accept={accept} name={name} onChange={handleFileInput} />
        </div>
    )
}

export default FormUploader
