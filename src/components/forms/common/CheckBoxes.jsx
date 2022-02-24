import React from "react"
import { Field, ErrorMessage } from "formik"

const Checkboxes = props => {
    const { label, name, options,  } = props
    return (
        <div>
            <label>{label}</label>
            <Field name={name}>
                {formik => {
                    const { field } = formik
                    return options.map(option => {
                        return (
                            <div key={option.key}>
                                <input
                                    type="checkbox"
                                    id={option.value}
                                    {...field}

                                    value={option.value}
                                    checked={field.value.includes(option.value)}
                                />
                                <label>{option.key}</label>
                            </div>
                        )
                    })
                }}
            </Field>
            <ErrorMessage name={name} />
        </div>
    )
};

export default Checkboxes