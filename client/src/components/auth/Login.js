// @flow
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import './login.css';
import { startLoginUser } from '../../redux/actions/userAction';
import CardReusableComp from './cardReusableComp';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Login = (props) => {
  return (
    <CardReusableComp mainName='Sign in'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(formData) => {
          //   props.startLoginUser(formData);
          const redirect = () => {
            return props.history.push('/users/agendas');
          };
          //   console.log(formData, 'LOGINDATA');
          props.startLoginUser(formData, redirect);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name='email'
              as={Input}
              placeholder='Your Email'
              className='mb-4'
              prefix={<UserOutlined style={{ fontSize: '25px' }} />}
            />
            <Field
              name='password'
              type='password'
              as={Input}
              placeholder='Your Password'
              className='mb-4'
              prefix={<LockOutlined style={{ fontSize: '25px' }} />}
            />
            <div className='button-main'>
              <Button className='mt-3' htmlType='submit' type='button'>
                Login
              </Button>
              <div className='mb-3 mt-5 '>
                <Divider>or login with</Divider>
                <span className='d-flex justify-content-center'>Otp</span>
              </div>
              <Divider />
              <div className='d-flex justify-content-end pr-4'>
                <div>
                  Don't have an account?{' '}
                  <Link to='/users/register'>Sign Up</Link>
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
