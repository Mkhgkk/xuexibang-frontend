<<<<<<< HEAD
import React, { Component } from "react";
import ListCard from "./ListCard";

class Homework extends Component {
  state = {
    commentValue: "",
    replyValue: ""
  };

  handleCommentToggle = itemId => {
    const listData = [...this.state.listData];
    const index = listData.map(item => item._id).indexOf(itemId);
    listData[index]["commentToggler"] = listData[index]["commentToggler"]
      ? false
      : true;

    this.setState({ listData });
  };

  handleCommentSubmit = _id => {
    const listData = [...this.state.listData];
    const item = listData.filter(item => item._id === _id);

    item[0].comments = [
      { _id: new Date(), content: this.state.commentValue, replies: [] },
      ...item[0].comments
    ];
    this.setState({ listData: listData, commentValue: "" });
  };

  handleReplySubmit = (itemId, commentId) => {
    const listData = [...this.state.listData];
    const index = listData.map(item => item._id).indexOf(itemId);
    const item = listData[index];
    const commentIndex = item.comments
      .map(comment => comment._id)
      .indexOf(commentId);
    const comment = item.comments[commentIndex];
    comment["replies"] = [
      { _id: new Date(), content: this.state.replyValue },
      ...comment["replies"]
    ];
    this.setState({ listData: listData, replyValue: "" });
  };

  handleCommentChange = e => {
    this.setState({ commentValue: e.target.value });
  };

  handleReplyChange = e => {
    this.setState({ replyValue: e.target.value });
  };

  render() {
    const { auth, listData, onOpenEdit } = this.props;
    return (
      <div style={{ overflow: "scroll", height: "60vh" }}>
        <ListCard
          listData={listData}
          mode="Homework"
          auth={auth}
          commentValue={this.state.commentValue}
          replyValue={this.state.replyValue}
          handleCommentSubmit={this.handleCommentSubmit}
          handleReplySubmit={this.handleReplySubmit}
          handleCommentChange={this.handleCommentChange}
          handleReplyChange={this.handleReplyChange}
          onCommentToggle={this.handleCommentToggle}
          onOpenEdit={onOpenEdit}
        />
      </div>
    );
  }
}

export default Homework;
=======
import React, { Component } from "react";
import ListCard from "./ListCard";

class Homework extends Component {
  state = {
    commentValue: "",
    replyValue: ""
  };

  handleCommentToggle = itemId => {
    const listData = [...this.state.listData];
    const index = listData.map(item => item._id).indexOf(itemId);
    listData[index]["commentToggler"] = listData[index]["commentToggler"]
      ? false
      : true;

    this.setState({ listData });
  };

  handleCommentSubmit = _id => {
    const listData = [...this.state.listData];
    const item = listData.filter(item => item._id === _id);

    item[0].comments = [
      { _id: new Date(), content: this.state.commentValue, replies: [] },
      ...item[0].comments
    ];
    this.setState({ listData: listData, commentValue: "" });
  };

  handleReplySubmit = (itemId, commentId) => {
    const listData = [...this.state.listData];
    const index = listData.map(item => item._id).indexOf(itemId);
    const item = listData[index];
    const commentIndex = item.comments
      .map(comment => comment._id)
      .indexOf(commentId);
    const comment = item.comments[commentIndex];
    comment["replies"] = [
      { _id: new Date(), content: this.state.replyValue },
      ...comment["replies"]
    ];
    this.setState({ listData: listData, replyValue: "" });
  };

  handleCommentChange = e => {
    this.setState({ commentValue: e.target.value });
  };

  handleReplyChange = e => {
    this.setState({ replyValue: e.target.value });
  };

  render() {
    const { auth, listData, onOpenEdit, type } = this.props;
    return (
      <div style={{ overflow: "scroll", height: "60vh" }}>
        <ListCard
          listData={listData}
          mode={type}
          auth={auth}
          commentValue={this.state.commentValue}
          replyValue={this.state.replyValue}
          handleCommentSubmit={this.handleCommentSubmit}
          handleReplySubmit={this.handleReplySubmit}
          handleCommentChange={this.handleCommentChange}
          handleReplyChange={this.handleReplyChange}
          onCommentToggle={this.handleCommentToggle}
          onOpenEdit={onOpenEdit}
        />
      </div>
    );
  }
}

export default Homework;
>>>>>>> doggie
