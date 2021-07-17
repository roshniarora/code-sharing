import React from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "antd";
import { connect } from "react-redux";
import { postRoomOtp } from "../../redux/actions/roomAction";
import { useHistory } from "react-router-dom";
import "./otpPage.scss";
const OtpPage = (props) => {
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          otp: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          props.postRoomOtp(values, history);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="input_container d-flex justify-content-between">
              <Field name="otp" as={Input} placeholder=" enter OTP here" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { postRoomOtp })(OtpPage);
