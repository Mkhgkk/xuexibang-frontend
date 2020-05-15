import React, { Component } from "react";
import { Card, Tooltip } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";

class HomeworkCard extends Component {
  daysRemaining = () => {
    const deadline = moment(this.props.homework.deadline);
    const todaysdate = moment();
    const daysleft = deadline.diff(todaysdate, "days");

    if (!moment().isBefore(moment(this.props.homework.deadline), "minute")) {
      return (
        <div>
          <ClockCircleOutlined style={{ marginRight: "0.5em" }} />
          Past due
        </div>
      );
    } else if (daysleft === 0) {
      return (
        <div>
          <ClockCircleOutlined style={{ color: "red", marginRight: "0.5em" }} />
          In 24hours
        </div>
      );
    } else {
      return (
        <div>
          <ClockCircleOutlined
            style={{ color: "orange", marginRight: "0.5em" }}
          />
          {daysleft === 1 ? daysleft + "day left" : daysleft + "days left"}
        </div>
      );
    }
  };

  render() {
    const { Meta } = Card;
    const { homework, type } = this.props;

    return (
      <Card
        style={{ width: 300 }}
        actions={
          type === 1 && [
            <Tooltip
              title={`Deadline: ${moment(homework.deadline)
                .add(0, "days")
                .calendar()} `}
            >
              <div>{this.daysRemaining()}</div>
            </Tooltip>
          ]
        }
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
          description={[
            <div>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  height: 200,
                  overflow: "scroll",
                  paddingRight: "1em"
                }}
              >
                {homework.content}
              </pre>
            </div>
          ]}
        />
      </Card>
    );
  }
}

export default HomeworkCard;
