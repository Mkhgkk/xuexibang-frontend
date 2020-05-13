import React, { Component } from "react";
import Chatlist from "./Chatlist";

class ChatListBox extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#22075e",
          height: 450,
          width: 170
        }}
      >
        <div
          style={{
            height: 40,
            borderBottom: "1px solid #391085",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <input
            placeholder="Search"
            style={{
              backgroundColor: "#120338",
              border: "none",
              paddingLeft: "0.5em",
              color: "#bfbfbf",
              borderRadius: "5px"
            }}
          />
        </div>
        <div style={{ height: 410, overflow: "scroll" }}>
          <Chatlist active />
          <Chatlist />
          <Chatlist />
          <Chatlist />
          <Chatlist />
          <Chatlist />
          <Chatlist />
          <Chatlist />
          <Chatlist />
        </div>
      </div>
    );
  }
}

export default ChatListBox;
