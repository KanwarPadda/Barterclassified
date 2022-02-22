import React from 'react';
import {useField} from "formik";

const ImageUpload = ({onClick, fileName, src}) => {

    return (
        <div onClick={onClick}>
            {!src && <button onClick={onClick}>Choose Image</button>}
            <img src={src} />
            <p>{fileName}</p>

        </div>
    );
};

export default ImageUpload;
