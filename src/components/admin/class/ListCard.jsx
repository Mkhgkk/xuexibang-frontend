import React, { Component } from "react";
import { List, Avatar } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Edit from "./Edit";

class ListCard extends Component {
  state = {
    viewEdit: false
  };

  onClose = () => {
    this.setState({
      viewEdit: false
    });
  };

  render() {
    const { listData, mode } = this.props;
    const { viewEdit } = this.state;

    return (
      <>
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
                <p
                  onClick={() => {
                    this.setState({ viewEdit: true });
                  }}
                >
                  Edit
                </p>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.userName}
                description={item.date}
              />
              {item.content}
              <Edit
                visible={viewEdit}
                mode={mode}
                onClose={this.onClose}
                data={item}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}
export default ListCard;
