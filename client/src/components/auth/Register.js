// @flow
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { startRegisterUser } from '../../redux/actions/userAction';
import CardReusableComp from './cardReusableComp';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

const Register = (props) => {
  return (
    <div>
      <CardReusableComp mainName='Register'>
        <Formik
          initialValues={{ username: '', email: '', password: '', mobile: '' }}
          onSubmit={(values) => {
            // console.log(values);

            const redirect = () => {
              return props.history.push('/users/login');
            };

            props.startRegisterUser(values, redirect);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label>UserName</label>
              <Field
                name='username'
                as={Input}
                placeholder=' UserName'
                prefix={<UserOutlined style={{ fontSize: '25px' }} />}
              />
              <label>Email</label>
              <Field
                name='email'
                as={Input}
                placeholder='Email'
                prefix={<MailOutlined style={{ fontSize: '25px' }} />}
              />
              <label>Mobile</label>
              <Field
                name='mobile'
                as={Input}
                placeholder='your mobile no.'
                prefix={<PhoneOutlined style={{ fontSize: '25px' }} />}
              />
              <label>Password</label>
              <Field
                name='password'
                type='password'
                as={Input}
                placeholder='Password'
                prefix={<LockOutlined style={{ fontSize: '25px' }} />}
              />{' '}
              <br />
              {/* <label>Mobile</label>
            <Field name='mobile' as={Input} placeholder='mobile' /> <br /> */}
              <div className='mt-4 text-right'>
                <Button htmlType='submit' type='button'>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardReusableComp>
    </div>
  );
};

export default connect(null, { startRegisterUser })(Register);
