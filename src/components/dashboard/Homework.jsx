import React, { Component } from "react";
import { Row, Col, Divider, message } from "antd";
import HomeworkCard from "./HomeworkCard";

class Homework extends Component {
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
        <h1 style={{ textAlign: "center" }}>My Homework</h1>

        <Divider
          orientation="center"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Pending
        </Divider>

        <Row gutter={[32, 24]}>
          {this.state.keys.map((v) => (
            <Col span={6}>
              <HomeworkCard
                type={1}
                onDelete={() => this.handleDelete(v.key)}
                key={v.key}
              />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Homework;
