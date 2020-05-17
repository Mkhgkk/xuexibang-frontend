import React, { Component } from "react";
import { Col } from "antd";
import MessengerBox from "./MessengerBox";
import ChatListBox from "./ChatListBox";
import QueueAnim from "rc-queue-anim";

class Chat extends Component {
  state = {
    listOpen: true,
    list: [
      { _id: "1", userName: "anmengning" },
      { _id: "2", userName: "Joy" },
      { _id: "3", userName: "Yaho" }
    ],
    currentChatId: ""
  };

  listToggle = () => {
    this.setState({ listOpen: !this.state.listOpen });
  };
  openChat = id => {
    this.setState({ currentChatId: id });
  };

  render() {
    const { listOpen, list, currentChatId } = this.state;
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
              <ChatListBox
                listOpen={listOpen}
                data={list}
                openChat={this.openChat}
                currentChatId={currentChatId}
              />
            </Col>
          )}
        </QueueAnim>
        <Col style={{ boxShadow: "0px 0px 10px 0px #bfbfbf" }}>
          <MessengerBox
            listOpen={listOpen}
            listToggle={this.listToggle}
            onClose={onClose}
            chatId={currentChatId}
          />
        </Col>
      </div>
    );
  }
}

export default Chat;
