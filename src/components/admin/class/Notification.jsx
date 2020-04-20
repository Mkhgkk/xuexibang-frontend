import React, { Component } from "react";
import ListCard from "./ListCard";

class Notification extends Component {
  state = {
    listData: [
      {
        _id: "123",
        userName: "username",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        date: "15th May",
        deadline: "1st Sep",
      },
      {
        _id: "123",
        userName: "username",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        date: "15th May",
        deadline: "1st Sep",
      },
      {
        _id: "123",
        userName: "username",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        date: "15th May",
        deadline: "1st Sep",
      },
    ],
  };
  render() {
    return (
      <div style={{ overflow: "scroll", height: "60vh" }}>
        <ListCard listData={this.state.listData} mode="Announcement" />
      </div>
    );
  }
}

export default Notification;
