import React, { Component } from "react";
import { Card, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { black } from "color-name";

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
            <Link
              to={`/dashboard/classes/${homework.course._id}`}
              style={{ color: "#1f1f1f" }}
            >
              <Tooltip placement="topLeft" title={homework.course.name}>
                <div>{homework.course.name}</div>
              </Tooltip>
            </Link>,
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
