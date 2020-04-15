import React, { Component } from "react";
import { Card, Avatar, Popconfirm, message } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

class AnnouncementCard extends Component {
  state = {};

  render() {
    const { Meta } = Card;
    return (
      <Card
        style={{ width: 300 }}
        // cover={
        //   <img
        //     alt="example"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //   />
        // }
        actions={[
          <QuestionCircleOutlined key="question" />,
          <Popconfirm
            title="Are you sure you want to delete this?"
            onConfirm={this.props.onDelete}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined key="ellipsis" />
          </Popconfirm>,
        ]}
      >
        <Meta
          //   avatar={
          //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          //   }
          title="Data Structure"
          description="This is the description"
        />
      </Card>
    );
  }
}

export default AnnouncementCard;
