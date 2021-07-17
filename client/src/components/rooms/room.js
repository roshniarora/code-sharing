import React, { useEffect, useState } from "react";
import { postRoom } from "../../redux/actions/roomAction.js";
import { showModal } from "../../redux/actions/modalAction";
import { connect } from "react-redux";
// import { Formik, Form, Field } from "formik";
import { Collapse } from "antd";
import axios from "../../config/axios";
import io from "socket.io-client";
// import Button from "../utilities/Button";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";

import { UnControlled as CodeMirror } from "react-codemirror2";

const { Panel } = Collapse;
const socket = io("http://localhost:3040");

function Room(props) {
  const [visibleOTP, setVisibleOTP] = useState(false);
  const [agenda, setAgenda] = useState({});
  const [rooms, setRooms] = useState([]);

  socket.connect();

  const otp = window.location.href.split("/");
  useEffect(() => {
    async function dataFetch() {
      const result = await axios.get(`/${otp[3]}`);
      console.log(result.data, "sdfds");
      setAgenda(result.data);
      setRooms(result.data.rooms);
    }
    dataFetch();
  }, []);
  localStorage.setItem("otp", agenda?._id);
  agenda?.otp && console.log(agenda?.otp, "agenda.otp");
  socket.on(agenda.otp, (message) => setRooms([{ ...message }, ...rooms]));

  const handleCancel = (e) => {
    setVisibleOTP(false);
  };
  const otplocal = window.location.href.split("/");
  const handleAddNote = () => {
    localStorage.setItem("otp", otplocal[3]);
    props.showModal({
      modalType: "ADD_NOTE",
      modalProps: { show: true },
    });
  };
  return (
    <div>
      <button id="addNote" onClick={handleAddNote}>
        Add Note
      </button>
      <div></div>
      <ul>
        {rooms?.map((ele) => (
          // <li>{ele?.title}</li>
          <div className="mt-5">
            <Collapse accordion>
              <Panel header={ele.title} key="1">
                <CodeMirror
                  value={ele.description}
                  options={{
                    mode: "xml",
                    theme: "material",
                    lineNumbers: true,
                  }}
                />
              </Panel>
            </Collapse>
          </div>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, { showModal, postRoom })(Room);
