// @flow
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Modal, notification } from 'antd';
import io from 'socket.io-client';

function RoomLogin(props) {
  //   const [state, setstate] = useState();
  const socket = io('http://localhost:3040');
  socket.on('notification', (messages) =>
    notification.open({
      message: messages,
      description: 'This is the content of the submit notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    })
  );
  socket.on('formDataBackend', (message) =>
    notification.open({
      message: `Title : ${message.title} Description: ${message.description}`,
      description: 'This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    })
  );
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
          socket.emit('formValues', values);
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
