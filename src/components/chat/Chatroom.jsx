import React, { Component } from "react";

class Chatroom extends Component {
  // scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView();
  // };

  // componentDidMount() {
  //   this.scrollToBottom();
  // }
  render() {
    const { data, typing } = this.props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <div
          style={{
            width: "100%",
            height: 351,
            overflow: "scroll",
            paddingRight: "0.5em",
            paddingLeft: "0.5em",
            paddingTop: "0.5em"
          }}
          ref={el => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          <p style={{ fontSize: "0.8em", textAlign: "center" }}>May 13</p>
          {data &&
            data.map(m => (
              <div
                className={m.postedBy._id === "11" ? "bubbleMe" : "bubbleYou"}
              >
                {m.content}
              </div>
            ))}

          {typing && (
            <div className="bubbleMe typingDiv">
              <div className="typing one"></div>
              <div className="typing two"></div>
              <div className="typing three"></div>
            </div>
          )}
          {/* <div
            ref={el => {
              this.messagesEnd = el;
              
            }}
          ></div> */}
        </div>
      </div>
    );
  }
}

export default Chatroom;
