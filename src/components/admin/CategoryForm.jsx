import React from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addCategory} from "../../Redux/reducers/categorySlice";
import TextInput from "../forms/common/TextInput";
import TextArea from "../forms/common/TextArea";


const validationSchema = Yup.object({
    title: Yup.string().required('must provide a title'),
    description: Yup.string().required('must provide a description')

})
const initialValues = {
    title: '',
    description: ''
}

const CategoryForm = () => {
    const dispatch = useDispatch();
    return (
        <Segment>
            <Header textAlign="center" content={'Create Category'}/>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    dispatch(addCategory(values))
                }}
                validationSchema={validationSchema}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className="ui form">
                        <TextInput name={'title'} placeholder={'Category Title'}/>
                        <TextArea name={'description'} placeholder={'Enter Category Description'} rows={3}/>


                        <Button loading={isSubmitting} // this will load the screen
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit" floated={'right'} positive content={'Submit'}
                        />

                        <Button
                            as={Link}
                            to={'/'}
                            negative
                            type="submit"
                            floated={'right'}
                            content={'Cancel'}
                            disabled={isSubmitting}
                        />
                    </Form>
                )}


            </Formik>

        </Segment>
    );
};

export default CategoryForm;
