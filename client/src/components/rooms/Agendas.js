import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, DatePicker, Space } from 'antd';
import { useHistory } from 'react-router';
import { Formik, Form, Field } from 'formik';
import { PlusCircleOutlined } from '@ant-design/icons';
import { postAgenda, getAgendas } from '../../redux/actions/agendasAction';
import { connect } from 'react-redux';
import moment from 'moment';
import './agendas.scss';

const dateFormat = 'DD/MM/YYY';
const Agendas = (props) => {
  const history = useHistory();

  const [rowData, setRowData] = useState({});
  const [visibleRow, setVisibleRow] = useState(false);
  const [visibleAgenda, setVisibleAgenda] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    props.getAgendas();
  }, []);

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

  const data = props?.agandas?.map((ele) => ({ ...ele }));
  const handleCancel = (e) => {
    setVisibleAgenda(false);
    setVisibleRow(false);
  };

  // console.log(props.agandas);
  const rowModal = (record) => {
    setVisibleRow(true);
    setRowData(record);
    console.log(visibleRow);
  };
  console.log(props.agenda);
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
            props.postAgenda(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* <label>Title</label> */}
              <div className='d-flex justify-content-center'>
                {/* <Field name='date' as={DatePicker} format={dateFormat} /> */}
                {/* <Field name='Date' as={DatePicker} format={dateFormat} /> */}
              </div>
              <Field name='title' as={Input} placeholder=' title' /> <br />
              {/* <label>Description</label> */}
              <Field name='description' as={Input} placeholder='description' />
              {/* <label>Available from</label> */}
              {/* <Field
                name='available from'
                as={Input}
                placeholder='available from'
              />{' '}
              <br />
              {/* <label>Duration</label> */}
              {/* <Field name='duration' as={Input} placeholder='duration' /> <br />
              <br />  */}
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
      <Table
        columns={columns}
        dataSource={props?.agandas}
        onRow={(record, index) => {
          return {
            onClick: () => rowModal(record),
          };
        }}
        // rowSelection={(record) => console.log(record, 'asds')}
      />

      <Modal
        visible={visibleRow}
        // onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <div className='d-flex justify-content-center'>
          <Formik
            initialValues={{
              title: rowData?.title || '',
              description: rowData?.description || '',
              createdAt: moment(rowData?.createdAt).format('dddd,MMM DD') || '',
              otp: rowData?.otp || '',
            }}
            enableReinitialize
            onSubmit={(values) => {
              console.log('submit', values);

              props.editagendas();
            }}
          >
            {({ handleSubmit }) => (
              <div className='edit_form'>
                <Form onSubmit={handleSubmit}>
                  <Field
                    name='createdAt'
                    as={Input}
                    disabled={disabled}
                    placeholder=' createdAt'
                  />
                  <div className='otp'>
                    <Field
                      name='otp'
                      as={Input}
                      disabled={disabled}
                      placeholder=' otp'
                    />
                  </div>
                  <Field
                    name='title'
                    as={Input}
                    disabled={disabled}
                    placeholder=' title'
                  />

                  <Field
                    name='description'
                    as={Input}
                    disabled={disabled}
                    placeholder='description'
                  />

                  <div className='mt-4 text-right'>
                    <Button htmlType='submit' type='button'>
                      {' '}
                      Submit{' '}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className='d-flex'>
          <Button onClick={() => setDisabled(!disabled)}>Edit note</Button>
          <Button>Add note</Button>

          <Button>Show note</Button>
          <Button>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  agandas: state.agandas.agendas,
});

export default connect(mapStateToProps, { postAgenda, getAgendas })(Agendas);
