import React from 'react';
import ModalWrapper from "../common/modals/ModalWrapper";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextInput from "../common/form/TextInput";
import {Button} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {signInUser} from "../store/authSlice";
import {closeModal} from "../store/modalSlice";
import {useHistory} from "react-router-dom";

const LogInForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    return (
        <ModalWrapper size={'mini'} header={'Sign in to Barter Classified'}>
            <Formik initialValues={{email: '', password: ''}}
                    validationSchema={Yup.object({
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        dispatch(signInUser(values));
                        setSubmitting(false);
                        dispatch(closeModal())
                        history.push('/admin')
                    }}
            >
                {({isSubmitting, isValid, dirty}) => (
                    <Form className={'ui form'}>
                        <TextInput name="email" placeholder={'Email Address'}/>
                        <TextInput name="password" placeholder={'Password'} type="password"/>
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