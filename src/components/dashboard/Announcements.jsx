import React, { Component } from "react";
import { Row, Col, Divider, Empty } from "antd";
import HomeworkCard from "./HomeworkCard";
import { getAnnouncement } from "../../services/feedService";
import HomeworkLoading from "./HomeworkLoading";

class Announcements extends Component {
  state = {
    announcement: [],
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const { data: announcement } = await getAnnouncement();
      this.setState({ announcement, loading: false });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { announcement, loading } = this.state;
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>Announcements</h1>

        {loading ? (
          <HomeworkLoading row={3} />
        ) : announcement.length === 0 ? (
          <Empty description="No announcement" style={{ marginTop: "10%" }} />
        ) : (
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Latest
          </Divider>
        )}
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
