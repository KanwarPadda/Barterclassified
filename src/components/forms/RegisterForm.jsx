import React, { useState, useEffect } from "react";
import ModalWrapper from "../../components/layout/modals/ModalWrapper";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/reducers/authSlice";
import { closeModal } from "../../Redux/reducers/modalSlice";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TextInput from "./common/TextInput";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [maxDate, setMaxDate] = useState(moment().subtract(14, "years")._d);
  const [minDate, setMinDate] = useState(moment().subtract(105, "years")._d);
  const [dob, setDob] = useState("");
  const [invalidDate, setInvalidDate] = useState(false);
  useEffect(() => {}, []);

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
          dob: Yup.date(),
          location: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (dob === "") {
            setInvalidDate(true);
            setSubmitting(false);
            return;
          }
          dispatch(registerUser(values));
          setSubmitting(false);
          dispatch(closeModal());
          history.push("/admin");
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className={"ui form"}>
            <TextInput name="email" placeholder={"Email Address"} />
            <TextInput name="firstname" placeholder={"First Name"} />
            <TextInput name="lastname" placeholder={"Last Name"} />
            <DatePicker
              name="dob"
              placeholderText="Date of Birth"
              selected={dob}
              onChange={(date) => {
                setDob(date);
                setInvalidDate(false);
              }}
              maxDate={maxDate}
              minDate={minDate}
            />
            {invalidDate ? (
              <div>
                <p style={{ color: "red", marginLeft: "5px" }}>
                  Please select date
                </p>
              </div>
            ) : (
              <></>
            )}
            <TextInput name="location" placeholder={"Location"} />
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
