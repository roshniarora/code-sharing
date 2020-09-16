import React, { useState } from 'react';
import { Table, Button, Modal, Input, DatePicker, Space } from 'antd';
import { useHistory } from 'react-router';
import { Formik, Form, Field } from 'formik';
import { PlusCircleOutlined } from '@ant-design/icons';

const arr = [
  {
    title: '111',
    description: 'Hellow',
  },
  {
    title: '111',
    description: 'Hellow',
  },
  {
    title: '111',
    description: 'Hellow',
  },
  {
    title: '111',
    description: 'Hellow',
  },
  {
    title: '111',
    description: 'Hellow',
  },
];
const dateFormat = 'DD/MM/YYY';
const Agendas = (props) => {
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [visibleAgenda, setVisibleAgenda] = useState(false);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'OTP',
      dataIndex: 'otp',
      key: 'otp',
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
    },
    {
      title: 'Viewable',
      dataIndex: 'viewable',
      key: 'viewable',
    },
    {
      title: 'addNote',
      dataIndex: 'addNote',
      key: 'viewable',
      // render: () => <Button onClick={() => setVisible(true)}>add Note</Button>,
    },
  ];

  const data = arr.map((ele) => ({ ...ele }));

  // const handleOk = (e) => {
  //   setVisibleAgenda(false);
  // };

  const handleCancel = (e) => {
    setVisibleAgenda(false);
  };
  return (
    <div>
      <Modal visible={visibleAgenda} footer={false} onCancel={handleCancel}>
        <Formik
          initialValues={{
            title: '',
            description: '',
            Date: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* <label>Title</label> */}
              <div className='d-flex justify-content-center'>
                {/* <Field name='date' as={DatePicker} format={dateFormat} /> */}
                <Field name='Date' as={DatePicker} format={dateFormat} />
              </div>
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
              <div className='d-flex'>
                <Button htmlType='submit' type='button'>
                  Submit
                </Button>
                <Button onCancel={handleCancel} type='button'>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <div className='d-flex flex-row'>
        <div className='col-sm-11 my-2 '>
          <h2> Agendas </h2>
        </div>
        <div className='my-3 align-right col-sm-1'>
          {' '}
          <PlusCircleOutlined
            onClick={() => setVisibleAgenda(true)}
            style={{ fontSize: '25px', cursor: 'pointer' }}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Agendas;
