import React, { Component } from "react";
import { Row, Col, Divider, message } from "antd";
import HomeworkCard from "./HomeworkCard";
import { getAnnouncement } from "../../services/feedService";

class Announcements extends Component {
  state = {
    announcement: []
  };

  componentDidMount = async () => {
    const { data: announcement } = await getAnnouncement();
    this.setState({ announcement });
  };

  // handleDelete = value => {
  //   const keys = [...this.state.keys];
  //   keys.pop();
  //   this.setState({ keys });
  //   message.success("Class has been deleted!");
  // };

  render() {
    const { announcement } = this.state;
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>Announcements</h1>

        <Divider
          orientation="center"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Latest
        </Divider>

        <Row gutter={[32, 24]}>
          {announcement.map(v => (
            <Col span={6}>
              <HomeworkCard key={v._id} homework={v} />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Announcements;
