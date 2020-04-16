import React from "react";
import { List, Avatar } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const ListCard = ({ listData }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <div>
              <MessageOutlined style={{ marginRight: 8 }} /> 2
            </div>,
            item.deadline && <p>Deadline: {item.deadline}</p>,
            <p>Edit</p>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.userName}
            description={item.date}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default ListCard;
