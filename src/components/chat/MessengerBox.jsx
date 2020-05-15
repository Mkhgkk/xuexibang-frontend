import React, { Component } from "react";
import MessageHead from "./MessageHead";
import InputBox from "./InputBox";
import Chatroom from "./Chatroom";

class MessengerBox extends Component {
  render() {
    const { listOpen, listToggle, onClose } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#f9f0ff",
          height: 450,
          width: 280,
          overflow: "scroll"
        }}
      >
        <MessageHead
          listOpen={listOpen}
          listToggle={listToggle}
          onClose={onClose}
        />
        <Chatroom />
        <InputBox />
      </div>
    );
  }
}

export default MessengerBox;
