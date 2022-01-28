import React from 'react';
import {useField} from "formik";
import {FormField, Label} from "semantic-ui-react";

const TextArea = ({label, ...props}) => {
    const [field, meta] = useField(props); // usefield comes from formik
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <textarea {...field}{...props}/>
            {meta.touched && meta.error ? (
                <Label basic color={'red'}>{meta.error}</Label>
            ) : null}
        </FormField>
    )
};

export default TextArea;
