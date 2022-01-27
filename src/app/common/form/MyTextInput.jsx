import React from 'react';
import {useField} from "formik";

const MyTextInput = ({label,...props}) => {
    const [field, meta] = useField(props);
    return (
        <div>
            
        </div>
    );
};

export default MyTextInput;
