import React, { Component } from "react";
import ListCard from "./ListCard";
import { getAnnouncementById } from "../../../services/feedService";

class Notification extends Component {
  state = {
    listData: [],

    commentValue: "",
    replyValue: ""
  };

  componentDidMount = async () => {
    const id = this.props.courseId;
    const { data: listData } = await getAnnouncementById(id);
    this.setState({ listData });
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
    return (
      <div style={{ overflow: "scroll", height: "60vh" }}>
        <ListCard
          listData={this.state.listData}
          mode="Announcement"
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

export default Notification;
