import React from 'react';
import ModalWrapper from "../../components/layout/modals/ModalWrapper";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import {Button, Label} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {loginUserAsync} from "../../Redux/reducers/authSlice";
import {useHistory} from "react-router-dom";
import TextInput from "./common/TextInput";
import {closeModal} from "../../Redux/reducers/modalSlice";
import {toast} from "react-toastify";

const LogInForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { error} = useSelector(state => state.auth);
    return (
        <ModalWrapper size={'mini'} header={'Sign in to Barter Classified'}>
            <Formik initialValues={{email: '', password: ''}}
                    validationSchema={Yup.object({
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {

                        const {email, password} = values
                        const result = await dispatch(loginUserAsync({email, password}));
                        if (result.meta.requestStatus === `rejected`) {
                            setSubmitting(false);
                            setErrors({error});
                        } else if (result.payload.email==="admin@gmail.com") {
                            setSubmitting(false);
                            dispatch(closeModal())
                            history.push("/admin");
                            toast.success('welcome to admin Panel');
                        } else {
                            setSubmitting(false);
                            dispatch(closeModal())
                            toast.success('Welcome to Barter Classified')
                            history.push("/");
                        }


                    }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className={'ui form'}>
                        <TextInput name="email" placeholder={'Email Address'}/>
                        <TextInput name="password" placeholder={'Password'} type="password"/>
                        {errors.error && <Label basic color={'red'} style={{marginBottom: 10}} content={errors.error}/>}
                        <Button loading={isSubmitting} // this will load the screen
                                disabled={!isValid || !dirty || isSubmitting}
                                type="submit" fluid positive content={'Log in '}
                                size={'large'}
                        />


                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
};

export default LogInForm;