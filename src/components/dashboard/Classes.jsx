import React, { Component } from "react";
import Class from "./ClassCard";
import { Row, Col, message } from "antd";

class Classes extends Component {
  state = {
    keys: [1, 2, 3, 4, 5],
  };

  handleDelete = (value) => {
    const keys = [...this.state.keys];
    keys.pop();
    this.setState({ keys });
    message.success("Class has been deleted!");
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>My Classes</h1>

        <Row gutter={[32, 24]}>
          {this.state.keys.map((v) => (
            <Col span={6}>
              <Class onDelete={() => this.handleDelete(v.key)} key={v.key} />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Classes;
