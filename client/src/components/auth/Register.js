// @flow
import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, Modal } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { startRegisterUser } from "../../redux/actions/userAction";
import CardReusableComp from "./cardReusableComp";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Button from "../utilities/Button";
import "./login.scss";

const Register = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/users/login");
  };

  return (
    <div>
      <CardReusableComp mainName="Register">
        <Formik
          initialValues={{ username: "", email: "", password: "", mobile: "" }}
          onSubmit={(values) => {
            // console.log(values);

            const redirect = () => {
              return props.history.push("/users/login");
            };

            props.startRegisterUser(values, redirect);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label>UserName</label>
              <Field
                name="username"
                as={Input}
                placeholder="Type your UserName"
                prefix={<UserOutlined style={{ fontSize: "25px" }} />}
              />
              <label>Email</label>
              <Field
                name="email"
                as={Input}
                placeholder="Type your Email"
                prefix={<MailOutlined style={{ fontSize: "25px" }} />}
              />
              <label>Mobile</label>
              <Field
                name="mobile"
                as={Input}
                placeholder="Type your mobile no."
                prefix={<PhoneOutlined style={{ fontSize: "25px" }} />}
              />
              <label>Password</label>
              <Field
                name="password"
                type="password"
                as={Input}
                placeholder="Type your Password"
                prefix={<LockOutlined style={{ fontSize: "25px" }} />}
              />
              <div className="mt-4 button-main">
                <Button buttonColor="gradient" buttonSize="btn-mobile">
                  Register
                </Button>
              </div>
              <div>
                <button onClick={handleClick} className="btn-sign-in">
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </CardReusableComp>
    </div>
  );
};

export default connect(null, { startRegisterUser })(Register);
