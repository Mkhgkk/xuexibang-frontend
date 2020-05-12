import React, { Component } from "react";
import { Tooltip } from "antd";
import { CommentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

class Actions extends Component {
  daysRemaining = () => {
    const deadline = moment(this.props.deadline);
    const todaysdate = moment();
    const daysleft = deadline.diff(todaysdate, "days");

    if (!moment().isBefore(this.props.deadline)) {
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
    const { deadline, onClick, commentCount, type } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <span onClick={onClick} style={{ cursor: "pointer" }}>
            <Tooltip title="Comment">
              <CommentOutlined />
            </Tooltip>
            <span> {commentCount} Comments</span>
          </span>
          {type === "homework" && (
            <div>
              <Tooltip
                title={`Deadline: ${moment(deadline)
                  .add(0, "days")
                  .calendar()} `}
              >
                {this.daysRemaining()}
              </Tooltip>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Actions;
