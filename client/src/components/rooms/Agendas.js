import React, { useState, useEffect } from "react";
import { Table, Modal, Input, message } from "antd";
import { useHistory } from "react-router";
import { Formik, Form, Field } from "formik";
import { PlusOutlined } from "@ant-design/icons";
import { postAgenda, getAgendas } from "../../redux/actions/agendasAction";
import { showModal } from "../../redux/actions/modalAction";
import { connect } from "react-redux";
import moment from "moment";
import Button from "../utilities/Button";
import "./agendas.scss";
import AddAgendas from "./addAgenda";
import PageTitle from "../utilities/pageHeader";

const dateFormat = "DD/MM/YYY";
const Agendas = (props) => {
  const history = useHistory();

  const [rowData, setRowData] = useState({});
  const [visibleRow, setVisibleRow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [visibleOTP, setVisibleOTP] = useState(false);

  useEffect(() => {
    props.getAgendas();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "OTP",
      dataIndex: "otp",
      key: "otp",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Viewable",
      dataIndex: "viewable",
      key: "viewable",
    },
    {
      title: "addNote",
      dataIndex: "addNote",
      key: "viewable",
    },
  ];

  const handleCancel = (e) => {
    setVisibleRow(false);
  };

  // console.log(props.agandas);
  const rowModal = (record) => {
    setVisibleRow(true);
    console.log(record);
    setRowData(record);
  };
  const success = () => {
    message.success(`Otp
      ${rowData?.otp} copied to clipboard`);
    navigator.clipboard.writeText(rowData?.otp);
  };
  const handleAddNote = () => {
    localStorage.setItem("agendaId", rowData?._id);

    setVisibleRow(false);
    props.showModal({
      modalType: "ADD_NOTE",
      modalProps: { show: true },
    });
  };
  const handleEdit = () => {
    setDisabled(!disabled);
  };

  return (
    <div>
      <div className="d-flex ">
        <div className="pageTitle_container">
          <PageTitle title="Agendas" appTitle="Agendas" />
        </div>
        <div className="addNote_container">
          <AddAgendas />
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
      />

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
                <PageTitle
                  title="Agenda"
                  addNote={handleAddNote}
                  edit={handleEdit}
                />
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="createdAt"
                    as={Input}
                    disabled={disabled}
                    placeholder=" createdAt"
                  />

                  <div className="otp cp" onClick={success}>
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

        <div className="action-btns">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  agandas: state.agandas.agendas,
  modal: state.modal,
});

export default connect(mapStateToProps, { showModal, postAgenda, getAgendas })(
  Agendas
);
