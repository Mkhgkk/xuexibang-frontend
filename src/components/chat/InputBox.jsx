import React, { Component } from "react";
import { Col, Row } from "antd";
import { SendOutlined } from "@ant-design/icons";

class InputBox extends Component {
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.onSubmit();
    }
  };
  render() {
    const { inputValue, onChange, onSubmit } = this.props;
    return (
      <div
        style={{
          backgroundColor: "white",
          height: 45
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
              value={inputValue}
              onChange={e => onChange(e)}
              onKeyDown={e => this.handleKeyDown(e)}
            />
          </Col>
          <Col span={3} style={{ margin: 0 }} onClick={e => onSubmit(e)}>
            <SendOutlined className="sendIcon" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputBox;
