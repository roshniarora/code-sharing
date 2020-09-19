import React from 'react';
import Modal from 'antd/lib/modal/Modal';

function TableRowModal(props) {
  console.log(props.record, 'tableRowComp');
  return (
    <div>
      <Modal visible={props.setVisible} footer={false}>
        <div>
          <h1>Modal Here</h1>
        </div>
      </Modal>
    </div>
  );
}

export default TableRowModal;
