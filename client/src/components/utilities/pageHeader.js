import React from "react";
import { PageHeader } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import edit from "../../images/edit.png";
import { BiEdit } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";

function PageTitle(props) {
  document.title = props.appTitle || "code sharing ";

  return (
    <PageHeader
      className="site-page-header"
      onBack={props.back ? props.back : null}
      title={props.title}
      subTitle={props.subTitle}
      extra={[
        props.addNote ? (
          <AiOutlinePlusSquare
            key="3"
            onClick={props.addNote}
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
        ) : null,
        props.edit ? (
          <BiEdit
            onClick={props.edit}
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
        ) : null,
      ]}
    />
  );
}

export default PageTitle;
