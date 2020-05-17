import React, { Component } from "react";
import { Badge, Avatar } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Chat from "./Chat";
import QueueAnim from "rc-queue-anim";

class ChatIcon extends Component {
  state = {
    messenger: true
  };

  messengerToggle = () => {
    this.setState({ messenger: !this.state.messenger });
  };
  render() {
    const { messenger } = this.state;
    return (
      <div>
        <div
          style={{ position: "fixed", bottom: "4em", right: "3em", zIndex: 1 }}
        >
          {!messenger ? (
            <Badge
              onClick={this.messengerToggle}
              count={1}
              style={{ backgroundColor: "orange" }}
            >
              <Avatar
                size={50}
                style={{
                  backgroundColor: "#722ed1",
                  boxShadow: "0px 0px 10px 0px #bfbfbf"
                }}
                icon={<MessageOutlined />}
              />
            </Badge>
          ) : (
            <QueueAnim className="queue-simple" type="bottom">
              <Chat key="a" onClose={this.messengerToggle} />
            </QueueAnim>
          )}
        </div>
      </div>
    );
  }
}

export default ChatIcon;
