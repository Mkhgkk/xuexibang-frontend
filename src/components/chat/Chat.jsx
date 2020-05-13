import React, { Component } from "react";
import { Col } from "antd";
import MessengerBox from "./MessengerBox";
import ChatListBox from "./ChatListBox";
import QueueAnim from "rc-queue-anim";

class Chat extends Component {
  state = {
    listOpen: false
  };

  listToggle = () => {
    this.setState({ listOpen: !this.state.listOpen });
  };
  render() {
    const { listOpen } = this.state;
    const { onClose } = this.props;
    return (
      <div
        style={{
          height: 450,
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <QueueAnim className="queue-simple">
          {listOpen && (
            <Col key="a" className="chatlist">
              <ChatListBox listOpen={listOpen} />
            </Col>
          )}
        </QueueAnim>
        <Col style={{ boxShadow: "0px 0px 10px 0px #bfbfbf" }}>
          <MessengerBox
            listOpen={listOpen}
            listToggle={this.listToggle}
            onClose={onClose}
          />
        </Col>
      </div>
    );
  }
}

export default Chat;
