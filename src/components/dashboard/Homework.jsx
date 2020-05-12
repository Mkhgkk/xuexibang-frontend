import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import HomeworkCard from "./HomeworkCard";
import { getHomework } from "../../services/feedService";
import moment from "moment";

class Homework extends Component {
  state = {
    pending: [],
    duePast: [],
  };

  componentDidMount = async () => {
    const { data: homework } = await getHomework();
    const pending = homework.filter((h) => moment().isBefore(h.deadline));
    const duePast = homework
      .filter((h) => !moment().isBefore(h.deadline))
      .reverse();
    this.setState({ pending, duePast });
  };

  render() {
    const { pending, duePast } = this.state;

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
          {pending.map((v) => (
            <Col span={6} key={v._id}>
              <HomeworkCard type={1} homework={v} />
            </Col>
          ))}
        </Row>

        <Divider
          orientation="center"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Past homework
        </Divider>

        <Row gutter={[32, 24]}>
          {duePast.map((v) => (
            <Col span={6} key={v._id}>
              <HomeworkCard type={1} homework={v} />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Homework;
