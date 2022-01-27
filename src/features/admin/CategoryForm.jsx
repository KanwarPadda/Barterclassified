import React from 'react';
import {Header, Segment} from "semantic-ui-react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().required('must provide a title')

})

const CategoryForm = () => {
    return (
        <Segment>
            <Header textAlign="center" content={'Create Category'}/>
            <Formik
                initialValues={null}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                {({values, handleChange, handleSubmit}) => (
                    <Form className="ui form" onSubmit={handleSubmit}>

                    </Form>
                )}

            </Formik>

        </Segment>
    );
};

export default CategoryForm;
