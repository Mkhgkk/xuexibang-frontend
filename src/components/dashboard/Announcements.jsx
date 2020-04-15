import React, { Component } from "react";
import { Row, Col, Divider, message } from "antd";
import HomeworkCard from "./HomeworkCard";
import AnnouncementCard from "./AnnouncementCard";

class Announcements extends Component {
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
        <h1 style={{ textAlign: "center" }}>Announcements</h1>

        <Divider
          orientation="center"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Latest
        </Divider>

        <Row gutter={[32, 24]}>
          {this.state.keys.map((v) => (
            <Col span={6}>
              <AnnouncementCard
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

export default Announcements;
