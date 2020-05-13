import React, { Component } from "react";
import { LeftOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Avatar } from "antd";

class MessageHead extends Component {
  render() {
    const { listOpen, listToggle, onClose } = this.props;
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "12%",
          boxShadow: "0px 0px 5px 0px #bfbfbf"
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center"
          }}
        >
          <Col span={3} onClick={listToggle}>
            {listOpen ? (
              <RightOutlined
                style={{ color: "#bfbfbf", marginLeft: "0.5em" }}
              />
            ) : (
              <LeftOutlined style={{ color: "#bfbfbf", marginLeft: "0.5em" }} />
            )}
          </Col>
          <Col span={4}>
            <Avatar size={35} />
          </Col>
          <Col
            span={15}
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%"
            }}
          >
            <p style={{ margin: 0 }}> Anmengning</p>
          </Col>
          <Col span={2}>
            <CloseOutlined style={{ color: "#bfbfbf" }} onClick={onClose} />
          </Col>
        </div>
      </div>
    );
  }
}

export default MessageHead;
