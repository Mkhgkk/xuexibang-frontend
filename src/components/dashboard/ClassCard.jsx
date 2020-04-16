import React, { Component } from "react";
import { Card, Avatar, Popconfirm, message } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  DeleteOutlined
} from "@ant-design/icons";

class Class extends Component {
  state = {};

  render() {
    const { Meta } = Card;
    const { editMode, onDelete } = this.props;

    return (
      <Card
        hoverable="true"
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <DeleteOutlined key="delete" />
        // ]}

        actions={
          editMode && [<DeleteOutlined key="delete" onClick={onDelete} />]
        }
      >
        <Meta
          //   avatar={
          //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          //   }
          title="Data Structure"
          description={[
            <div>Teacher' name: prof. Schultz</div>,
            <div>Number of students: 67</div>,
            <div> </div>,
            <div>Classroom: B302</div>,
            <div>QQ group: 24356456445</div>
          ]}
        />
      </Card>
    );
  }
}

export default Class;
