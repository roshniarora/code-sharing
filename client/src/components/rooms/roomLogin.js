// @flow
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Modal, notification } from 'antd';

function RoomLogin(props) {
  //   const [state, setstate] = useState();

  return (
    <div>
      <h1>Register with us </h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Title</label>
            <Field name='title' as={Input} placeholder=' UserName' /> <br />
            <label>Description</label>
            <Field name='description' as={Input} placeholder='Email' /> <br />
            <div>
              <Button htmlType='submit' type='button'>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RoomLogin;
