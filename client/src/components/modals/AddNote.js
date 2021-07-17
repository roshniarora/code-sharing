import React from "react";
import { connect } from "react-redux";
import { postRoom } from "../../redux/actions/roomAction";
import { showModal } from "../../redux/actions/modalAction";
import { Formik, Form, Field } from "formik";
import { Modal, Input, Button } from "antd";
import io from "socket.io-client";

const socket = io("http://localhost:3040");
const { TextArea } = Input;
const AddNote = (props) => {
  socket.connect();
  const handleCancel = () => {
    props.showModal({
      modalType: "ADD_NOTE",
      modalProps: { show: false },
    });
  };
  const agenda = localStorage.getItem("agendaId");
  const otplocal = localStorage.getItem("otp");

  return (
    <Modal visible={props.modal} footer={false} onCancel={handleCancel}>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          socket.emit("Code", {
            title: values.title,
            description: values.description,
            agenda: agenda,
            otp: agenda.otp,
          });
          props.postRoom({
            title: values.title,
            description: values.description,
            agenda: agenda,
            agendaOtp: otplocal,
          });
          props.showModal({
            modalType: "ADD_NOTE",
            modalProps: { show: false },
          });
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Title</label>
            <div className="d-flex justify-content-center">
              <Field name="title" as={Input} placeholder=" title" />
            </div>
            <label>Description</label>
            <Field name="description" as={TextArea} placeholder="description" />
            <div className="d-flex justify-content-center">
              <Button htmlType="submit" type="button">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal.modalProps,
});

export default connect(mapStateToProps, { postRoom, showModal })(AddNote);
