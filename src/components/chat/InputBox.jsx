import React, { Component } from "react";
import { Col, Row, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

class InputBox extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "10%"
        }}
      >
        <Row style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <Col span={21}>
            <input
              style={{
                border: "none",
                paddingLeft: "0.5em",
                width: "90%",
                marginLeft: "5%",
                fontSize: "0.9em"
              }}
              placeholder="Write message"
            />
          </Col>
          <Col span={3} style={{ margin: 0 }}>
            <SendOutlined style={{ color: "#722ed1", marginLeft: "0.5em" }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputBox;
