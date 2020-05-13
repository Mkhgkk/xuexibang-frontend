import React, { Component } from "react";
import { EllipsisOutlined } from "@ant-design/icons";

class Chatroom extends Component {
  render() {
    return (
      <div
        style={{
          height: "78%",
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "0.8em", textAlign: "center" }}>May 13</p>
          <div className="bubbleYou">Hi</div>
          <div className="bubbleYou">
            Ant Design's color palette also has the ability to further extend.
            After careful elaboration by designers and programmers,
          </div>
          <div className="bubbleMe">What the heck are you talking about?</div>
          <div className="bubbleMe">
            <EllipsisOutlined />
          </div>
        </div>
      </div>
    );
  }
}

export default Chatroom;
