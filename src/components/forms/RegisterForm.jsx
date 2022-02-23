import React, {useState} from "react";
import ModalWrapper from "../../components/layout/modals/ModalWrapper";
import {Form, Formik} from "formik";
import * as Yup from "yup";

import {Button} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../Redux/reducers/modalSlice";
import {useHistory} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "./common/TextInput";
import DateInput from "./common/DateInput";
import ImageUpload from "./common/ImageUpload";
import {ImageInput} from "formik-file-and-image-input";
import {registerUserAsync} from "../../Redux/reducers/authSlice";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const imageFormats = ["image/png", "image/svg", "image/jpeg"]

    return (
        <ModalWrapper size={"small"} header={"Register with Barter Classified"}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    firstname: "",
                    lastname: "",
                    dob: "",
                    location: "",
                    image: null
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string()
                        .required()
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                            "Must Contain 6 Characters, One Uppercase, One Lowercase, and One Number"
                        ),
                    firstname: Yup.string().required(),
                    lastname: Yup.string().required(),
                    dob: Yup.date().required(),
                    location: Yup.string().required(),
                    image: Yup.mixed().required(),
                })}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    const {email, firstname, lastname, dob, location,image,password} = values;
                    // extract data from date.
                    const birthday = {
                        year: new Date(dob).getFullYear(),
                        month: new Date(dob).getMonth() + 1,
                        date: new Date(dob).getDate()
                    }
                    dispatch(registerUserAsync({email, firstname, lastname,location,image,password,birthday}))


                    setSubmitting(false);
                    dispatch(closeModal());

                }}
            >
                {({isSubmitting, isValid, dirty}) => (
                    <Form className={"ui form"}>
                        <TextInput name="email" placeholder={"Email Address"}/>
                        <TextInput name="firstname" placeholder={"First Name"}/>
                        <TextInput name="lastname" placeholder={"Last Name"}/>
                        <DateInput name={'dob'} dateFormat={'yyyy/MM/dd'} placeholder={'Date of Birth'}/>
                        <ImageInput name={'image'} Component={ImageUpload} validFormats={imageFormats}/>

                        <TextInput name="location" placeholder={"Location"}/>
                        <TextInput
                            name="password"
                            placeholder={"Password"}
                            type="password"
                        />
                        <Button
                            loading={isSubmitting} // this will load the screen
                            disabled={!isValid || !dirty || isSubmitting}
                            type="submit"
                            fluid
                            positive
                            content={"Register"}
                            size={"large"}
                        />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
}
