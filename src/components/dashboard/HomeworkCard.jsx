import React, { Component } from "react";
import { Card, Button } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

class HomeworkCard extends Component {
  render() {
    const { Meta } = Card;
    const { homework, type } = this.props;

    return (
      <Card
        style={{ width: 300 }}
        actions={[
          <QuestionCircleOutlined key="question" />,
          type === 1 && (
            <div>
              Deadline:
              <br />
              {moment(homework.deadline)
                .add(0, "days")
                .calendar()}
            </div>
          )
        ]}
      >
        <Meta
          title={[
            <div>{homework.course.name}</div>,
            <h5 style={{ fontWeight: "normal" }}>
              {moment(homework.datePosted).calendar()}
            </h5>
          ]}
          description={[<div>{homework.content}</div>]}
        />
      </Card>
    );
  }
}

export default HomeworkCard;
