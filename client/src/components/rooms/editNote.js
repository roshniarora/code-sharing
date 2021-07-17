import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { connect } from "react-redux";
import { Table, Modal, Input } from "antd";
import Button from "../utilities/Button";
import { showModal } from "../../redux/actions/modalAction";
import { editAgendas } from "../../redux/actions/agendasAction";

const EditNote = (props) => {
  const [visibleRow, setVisibleRow] = useState(false);
  const [rowData, setRowData] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleCancel = (e) => {
    setVisibleRow(false);
  };

  const rowModal = (record) => {
    setVisibleRow(true);
    setRowData(record);
    console.log(visibleRow);
  };

  return (
    <div>
      <Modal
        visible={visibleRow}
        // onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <div className="d-flex justify-content-center">
          <Formik
            initialValues={{
              title: rowData?.title || "",
              description: rowData?.description || "",
              createdAt: moment(rowData?.createdAt).format("dddd,MMM DD") || "",
              otp: rowData?.otp || "",
            }}
            enableReinitialize
            onSubmit={(values) => {
              console.log("submit", values);

              props.editagendas();
            }}
          >
            {({ handleSubmit }) => (
              <div className="edit_form">
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="createdAt"
                    as={Input}
                    disabled={disabled}
                    placeholder=" createdAt"
                  />
                  <div className="otp">
                    <Field
                      name="otp"
                      as={Input}
                      disabled={disabled}
                      placeholder=" otp"
                    />
                  </div>
                  <Field
                    name="title"
                    as={Input}
                    disabled={disabled}
                    placeholder=" title"
                  />

                  <Field
                    name="description"
                    as={Input}
                    disabled={disabled}
                    placeholder="description"
                  />

                  {/* <div className="mt-4 text-right">
                    <Button htmlType="submit" type="button">
                      {" "}
                      Submit{" "}
                    </Button>
                  </div> */}
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <Button
          buttonStyle="btn-outline"
          buttonSize="btn-mobile"
          onClick={() => {
            props.showModal({
              modalType: "ADD_NOTE",
              modalProps: { show: true },
            });
          }}
        >
          Add note
        </Button>
        <div className="action-btns">
          <Button
            buttonStyle="btn-outline"
            onClick={() => setDisabled(!disabled)}
            buttonSize="btn-mobile"
          >
            Edit note
          </Button>

          <Button buttonStyle="btn-outline" buttonSize="btn-mobile">
            Show note
          </Button>
          <Button
            // onClick={() => handleClick()}
            buttonStyle="btn-outline"
            buttonSize="btn-mobile"
          >
            Delete
          </Button>
        </div>
      </Modal>
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
    </div>
  );
};
export default connect(null, { editAgendas })(EditNote);
