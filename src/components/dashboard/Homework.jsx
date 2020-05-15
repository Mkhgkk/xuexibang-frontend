import React, { Component } from "react";
import { Row, Col, Divider, Empty } from "antd";
import HomeworkCard from "./HomeworkCard";
import { getHomework } from "../../services/feedService";
import moment from "moment";
import HomeworkLoading from "./HomeworkLoading";

class Homework extends Component {
  state = {
    pending: [],
    duePast: []
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const { data: homework } = await getHomework();
      const pending = homework.filter(h =>
        moment().isBefore(moment(h.deadline), "minute")
      );
      const duePast = homework
        .filter(h => !moment().isBefore(h.deadline))
        .reverse();
      this.setState({ pending, duePast, loading: false });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { pending, duePast, loading } = this.state;

    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>My Homework</h1>
        {loading ? (
          <HomeworkLoading row={6} />
        ) : pending.length === 0 && duePast.length === 0 ? (
          <Empty description="No homework" style={{ marginTop: "10%" }} />
        ) : (
          <>
            <Divider
              orientation="center"
              style={{ color: "#333", fontWeight: "normal" }}
            >
              Pending
            </Divider>

            <Row gutter={[32, 24]}>
              {pending.map(v => (
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
              {duePast.map(v => (
                <Col span={6} key={v._id}>
                  <HomeworkCard type={1} homework={v} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default Homework;
