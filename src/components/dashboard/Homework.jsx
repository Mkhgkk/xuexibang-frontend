import React, { Component } from "react";
import { Row, Col, Divider, message } from "antd";
import HomeworkCard from "./HomeworkCard";
import { getHomework } from "../../services/feedService";

class Homework extends Component {
  state = {
    homework: []
  };

  componentDidMount = async () => {
    const { data: homework } = await getHomework();
    this.setState(homework);
  };

  render() {
    const { homework } = this.state;
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
          {homework.map(v => (
            <Col span={6}>
              <HomeworkCard type={1} key={v._id} homework={v} />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Homework;
