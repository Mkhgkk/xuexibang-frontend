import React, { Component } from "react";
import { List, Avatar } from "antd";

const data = [
  {
    title: "Fredrick",
  },
  {
    title: "Anna",
  },
  {
    title: "Thomas",
  },
  {
    title: "Irene",
  },
];

class HomeworkList extends Component {
  state = {};

  render() {
    const { type } = this.props;
    const deadline = type === 1 && (
      <div>
        <br />
        Deadline: 22:30
      </div>
    );

    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={[
                <a href="https://ant.design">{item.title}</a>,
                <div style={{ fontWeight: "normal" }}>Time: 22:30</div>,
              ]}
              description={[
                <div>
                  Ant Design, a design language for background applications, is
                  refined by Ant UED Team
                </div>,
                deadline,
              ]}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default HomeworkList;
