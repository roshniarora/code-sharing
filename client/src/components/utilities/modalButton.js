import React from "react";

import "./button.scss";

function ModalButton() {
  return (
    <div className="modal_btn">
      <button className="modal_btn_submit"> Submit </button>
      <button className="modal_btn_close"> Close </button>
    </div>
  );
}

export default ModalButton;
