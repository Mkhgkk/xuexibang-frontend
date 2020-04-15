import React, { Component } from "react";
import { Card, Avatar, Divider, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import HomeworkList from "./HomeworkList";

class ClassDetails extends Component {
  state = {};

  handleDelete = () => {
    this.props.history.replace("/dashboard/classes");
    message.success("Class has been deleted!");
  };

  render() {
    const { Meta } = Card;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Card
          style={{ width: 800, margin: "auto" }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <ShareAltOutlined key="share" />,
            <Popconfirm
              title="Are you sure you want to delete this?"
              onConfirm={this.handleDelete}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <DeleteOutlined key="ellipsis" />
            </Popconfirm>,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Database Management"
            description={[
              //   <div>this is the description</div>,
              <div>Teacher' name: prof. Schultz</div>,
              <div>Number of students: 67</div>,
              <div> </div>,
              <div>Classroom: B302</div>,
              <div>QQ group: 24356456445</div>,
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Homework
              </Divider>,
              <HomeworkList type={1} />,
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Announcements
              </Divider>,
              <HomeworkList />,
            ]}
          />
        </Card>
      </div>
    );
  }
}

export default ClassDetails;
