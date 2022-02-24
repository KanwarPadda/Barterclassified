/* global google  */
// this means global is google part of index.html

import React from "react";
import ModalWrapper from "../../components/layout/modals/ModalWrapper";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "./common/TextInput";
import DateInput from "./common/DateInput";
import ImageUpload from "./common/ImageUpload";
import {ImageInput} from "formik-file-and-image-input";
import PlaceInput from "./common/PlaceInput";
import {Button, Label} from "semantic-ui-react";
import {projectAuth} from "../../firestore/config";
import {loginUserAsync, registerUserAsync} from "../../Redux/reducers/authSlice";

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
                    location: {address: '', latLng: null},
                    image: null,
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
                    location: Yup.object().shape({
                        address: Yup.string().required('location is required')
                    }),
                    image: Yup.mixed().required(),
                })}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    const {email, firstname, lastname, dob, location, image, password,} = values;


                    // extract data from date.
                    const birthday = {
                        year: new Date(dob).getFullYear(),
                        month: new Date(dob).getMonth() + 1,
                        date: new Date(dob).getDate()
                    }
                    try {

                        const res = await projectAuth.createUserWithEmailAndPassword(email, password);
                        if (!res) {
                            setErrors({error: "something went wrong"});
                        } else {
                            await dispatch(registerUserAsync({
                                res,
                                firstname,
                                lastname,
                                location,
                                image,
                                birthday,
                                email
                            }))
                            setSubmitting(false);
                            await dispatch(loginUserAsync({email, password}));
                        }

                    } catch (e) {
                        setSubmitting(false);
                        setErrors({error: e.message})

                    }


                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className={"ui form"}>
                        <TextInput name="email" placeholder={"Email Address"}/>
                        <TextInput name="firstname" placeholder={"First Name"}/>
                        <TextInput name="lastname" placeholder={"Last Name"}/>
                        <DateInput name={'dob'} dateFormat={'yyyy/MM/dd'} placeholder={'Date of Birth'}/>
                        <ImageInput name={'image'} Component={ImageUpload} validFormats={imageFormats}/>

                        <PlaceInput name="location" placeholder="location"
                                    options={
                                        {
                                            location: new google.maps.LatLng(43.651070, -79.347015), // this where toronto is located
                                            radius: 2000,
                                            types: ['address']
                                        }
                                    }
                        />
                        <TextInput
                            name="password"
                            placeholder={"Password"}
                            type="password"
                        />
                        {errors.error && <Label basic color={'red'} style={{marginBottom: 10}} content={errors.error}/>}
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
