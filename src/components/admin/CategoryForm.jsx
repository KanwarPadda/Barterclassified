import React from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import TextInput from "../forms/common/TextInput";
import TextArea from "../forms/common/TextArea";
import {ImageInput} from "formik-file-and-image-input/lib"
import ImageUpload from "../forms/common/ImageUpload";
import {addCategoryAsync} from "../../Redux/reducers/categorySlice";

const initialValues = {
    title: '',
    description: '',
    image: null,
}
const validationSchema = Yup.object({
    title: Yup.string().required('must provide a title'),
    description: Yup.string().required('must provide a description'),
    image: Yup.mixed().required(),

})


const CategoryForm = () => {
    const dispatch = useDispatch();
    const imageFormats = ["image/png", "image/svg", "image/jpeg"]
    return (
        <Segment>
            <Header textAlign="center" content={'Create Category'}/>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    const {title, description, image} = values;
                    await dispatch(addCategoryAsync({title,description,image}))


                }}
                validationSchema={validationSchema}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className="ui form">
                        <TextInput name={'title'} placeholder={'Category Title'}/>
                        <TextArea name={'description'} placeholder={'Enter Category Description'} rows={3}/>
                        <ImageInput name={'image'} Component={ImageUpload} validFormats={imageFormats}/>


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
