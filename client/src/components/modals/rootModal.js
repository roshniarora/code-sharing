// import React from "react";
// import { connect } from "react-redux";

// const modals = {
// };

// const RootModal = (props) => {
//   const { modalType, modalProps } = props.modal;
//   if (!modalType) {
//     return null;
//   }
//   const Modal = modals[modalType];
//   return <Modal {...modalProps} />;
// };

// const mapStateToProps = (state) => ({
//   modal: state.modal,
// });

// export default connect(mapStateToProps)(RootModal);

import React from "react";
import { connect } from "react-redux";
import AddNote from "./AddNote";

const modals = {
  ADD_NOTE: AddNote,
};

const RootModal = (props) => {
  const { modalType, modalProps } = props.modal;

  if (!modalType) {
    return null;
  }

  const Modal = modals[modalType];

  return <Modal {...modalProps} />;
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(RootModal);
