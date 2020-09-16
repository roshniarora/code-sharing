// @flow
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, PageHeader } from 'antd';

function AddAgenda(props) {
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title='Add Agenda'
        subTitle={props.subTitle}
        // subTitle='This is a subtitle'
      />
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
            {/* <label>Title</label> */}
            <Field name='title' as={Input} placeholder=' title' /> <br />
            {/* <label>Description</label> */}
            <Field name='description' as={Input} placeholder='description' />
            {/* <label>Available from</label> */}
            <Field
              name='available from'
              as={Input}
              placeholder='available from'
            />{' '}
            <br />
            {/* <label>Duration</label> */}
            <Field name='duration' as={Input} placeholder='duration' /> <br />
            <br />
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

export default AddAgenda;
