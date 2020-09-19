import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { postRoomOtp } from '../../redux/actions/agendasAction';
import { useHistory } from 'react-router-dom';

const OtpPage = (props) => {
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          otp: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          props.postRoomOtp(values, history);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center'>
              <Field name='otp' as={Input} placeholder=' enter OTP' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { postRoomOtp })(OtpPage);
