import React, { Component } from "react";
import { Avatar, Col, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

class Chatlist extends Component {
  render() {
    const { active, data, openChat } = this.props;

    return (
      <div
        className={active ? "chatlistdiv activeChat" : "chatlistdiv"}
        onClick={() => {
          openChat(data._id);
        }}
      >
        <Col span={7}>
          <Badge dot={true} status="warning">
            <Avatar
              style={{ marginLeft: "0.5em", backgroundColor: "#b2b2b2" }}
              icon={<UserOutlined />}
            />
          </Badge>
        </Col>
        <Col span={17}>
          <p
            style={{
              color: "white",
              fontSize: "0.9em",
              opacity: "0.8",
              margin: 0
            }}
          >
            {data.userName}
          </p>
          <p
            style={{
              color: "white",
              fontSize: "0.7em",
              opacity: "0.6",
              margin: 0
            }}
          >
            What the heck are ...
          </p>
        </Col>
      </div>
    );
  }
}

export default Chatlist;
