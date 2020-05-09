import React, { Component } from "react";
import { List, Avatar } from "antd";
import moment from "moment";

class HomeworkList extends Component {
  render() {
    const { type, data } = this.props;

    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.postedBy.avatar} />}
              title={[
                <a href="#">{item.postedBy.userName}</a>,
                <div style={{ fontWeight: "normal" }}>
                  {moment(item.datePosted).calendar()}
                </div>
              ]}
              description={[
                <div>{item.content}</div>,
                type === 1 && (
                  <div>
                    Deadline:{" "}
                    {moment(item.deadline)
                      .add(0, "days")
                      .calendar()}
                  </div>
                )
              ]}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default HomeworkList;
