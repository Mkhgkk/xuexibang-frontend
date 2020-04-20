import React, { Component } from "react";
import ListCard from "./ListCard";

class Homework extends Component {
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
        comments: [
          {
            _id: 1,
            content: "come find me am dwelling in this fan shape hole of fame",
            replies: [
              { _id: 1, content: "What you said is not true Sir" },
              { _id: 2, content: "And what do you know about being true" },
            ],
          },
          {
            _id: 2,
            content: "another comment to check the sanity of reply input",
            replies: [],
          },
        ],
        commentToggler: false,
      },
      {
        _id: "124",
        userName: "username",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        date: "15th May",
        deadline: "1st Sep",
        comments: [
          {
            _id: 1,
            content: "this is a comment for testing",
          },
        ],
        commentToggler: false,
      },
      {
        _id: "125",
        userName: "username",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        date: "15th May",
        deadline: "1st Sep",
      },
    ],
    commentValue: "",
    replyValue: "",
  };

  handleCommentToggle = (itemId) => {
    const listData = [...this.state.listData];
    const index = listData.map((item) => item._id).indexOf(itemId);
    listData[index]["commentToggler"] = listData[index]["commentToggler"]
      ? false
      : true;

    this.setState({ listData });
  };

  handleCommentSubmit = (_id) => {
    const listData = [...this.state.listData];
    const item = listData.filter((item) => item._id === _id);

    item[0].comments = [
      { _id: new Date(), content: this.state.commentValue, replies: [] },
      ...item[0].comments,
    ];
    this.setState({ listData: listData, commentValue: "" });
  };

  handleReplySubmit = (itemId, commentId) => {
    const listData = [...this.state.listData];
    const index = listData.map((item) => item._id).indexOf(itemId);
    const item = listData[index];
    const commentIndex = item.comments
      .map((comment) => comment._id)
      .indexOf(commentId);
    const comment = item.comments[commentIndex];
    comment["replies"] = [
      { _id: new Date(), content: this.state.replyValue },
      ...comment["replies"],
    ];
    this.setState({ listData: listData, replyValue: "" });
  };

  handleCommentChange = (e) => {
    this.setState({ commentValue: e.target.value });
  };

  handleReplyChange = (e) => {
    this.setState({ replyValue: e.target.value });
  };

  render() {
    return (
      <div style={{ overflow: "scroll", height: "60vh" }}>
        <ListCard
          listData={this.state.listData}
          mode="Homework"
          commentValue={this.state.commentValue}
          replyValue={this.state.replyValue}
          handleCommentSubmit={this.handleCommentSubmit}
          handleReplySubmit={this.handleReplySubmit}
          handleCommentChange={this.handleCommentChange}
          handleReplyChange={this.handleReplyChange}
          onCommentToggle={this.handleCommentToggle}
        />
      </div>
    );
  }
}

export default Homework;
