// @flow
import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, Divider } from "antd";
import { connect } from "react-redux";
import "./login.scss";
import { startLoginUser } from "../../redux/actions/userAction";
import CardReusableComp from "./cardReusableComp";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "../utilities/Button";
const Login = (props) => {
  return (
    <CardReusableComp mainName="Sign in">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(formData) => {
          //   props.startLoginUser(formData);
          const redirect = () => {
            return props.history.push("/users/agendas");
          };
          //   console.log(formData, 'LOGINDATA');
          props.startLoginUser(formData, redirect);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Email</label>
            <Field
              name="email"
              as={Input}
              placeholder=" Type your Email"
              className="mb-4"
              prefix={<UserOutlined style={{ fontSize: "25px" }} />}
            />
            <label>Password</label>
            <Field
              name="password"
              type="password"
              as={Input}
              placeholder=" Type your Password"
              className="mb-4"
              prefix={<LockOutlined style={{ fontSize: "25px" }} />}
            />
            <div className="button-main">
              <Button
                buttonColor="gradient"
                buttonStyle="btn-primary"
                buttonSize="btn-mobile"
                htmlType="submit"
                type="button"
              >
                Login
              </Button>
              <div className="mb-3 mt-5 ">
                <Divider>or login with</Divider>
                <span className="d-flex justify-content-center">Otp</span>
              </div>
              <Divider />
              <div className="d-flex justify-content-end pr-4">
                <div>
                  Don't have an account?{" "}
                  <Link to="/users/register">Sign Up</Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </CardReusableComp>
  );
};
export default connect(null, { startLoginUser })(Login);
