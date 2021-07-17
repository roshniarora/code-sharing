import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal, Input } from "antd";
import { connect } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";

import ModalButton from "../utilities/modalButton";
import { postAgenda } from "../../redux/actions/agendasAction";
import PageTitle from "../utilities/pageHeader";
import "./agendas.scss";

const AddAgendas = (props) => {
  const [visibleAgenda, setVisibleAgenda] = useState(false);

  const handleCancel = (e) => {
    setVisibleAgenda(false);
  };
  return (
    <div>
      <Modal visible={visibleAgenda} footer={false} onCancel={handleCancel}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            Date: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            props.postAgenda(values);
            setVisibleAgenda(false);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <PageTitle title="Add Agenda" />
              {/* <label>Title</label> */}
              <div className="d-flex justify-content-center">
                {/* <Field name='date' as={DatePicker} format={dateFormat} /> */}
                {/* <Field name='Date' as={DatePicker} format={dateFormat} /> */}
              </div>
              <Field name="title" as={Input} placeholder=" title" /> <br />
              {/* <label>Description</label> */}
              <Field name="description" as={Input} placeholder="description" />
              <Field
                name="available from"
                as={Input}
                placeholder="available from"
              />
              <Field name="duration" as={Input} placeholder="duration" /> <br />
              <br />
              <div className="d-flex justify-content-center">
                {/* <Button
                  // buttonStyle="btn-outline"
                  buttonSize="btn-small"
                  buttonColor="blue"
                  htmlType="submit"
                  type="button"
                >
                  Submit
                </Button> */}
                {/* <Button onCancel={handleCancel} type="button">
                  Cancel
                </Button> */}
                <ModalButton />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <div className="my-3 align-right col-sm-1">
        {" "}
        <PlusCircleOutlined
          className="add_icon"
          onClick={() => setVisibleAgenda(true)}
          // style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default connect(null, { postAgenda })(AddAgendas);
