import React, { Component } from "react";
import { Card, Button } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

class HomeworkCard extends Component {
  state = {};

  render() {
    const { Meta } = Card;
    const type = this.props;
    const deadline = type === 1 && (
      <div>
        <br />
        Deadline: 22:30
      </div>
    );
    const { homework } = this.props;

    return (
      <Card
        style={{ width: 300 }}
        actions={[
          <QuestionCircleOutlined key="question" />,

          <Button>Done</Button>
        ]}
      >
        <Meta
          title={[
            <div>Database Management</div>,
            <h5 style={{ fontWeight: "normal" }}>Posted: 22:30</h5>
          ]}
          description={[
            <div>
              Also note that Git should not complain about the git branch -d.
            </div>,
            deadline
          ]}
        />
      </Card>
    );
  }
}

export default HomeworkCard;
