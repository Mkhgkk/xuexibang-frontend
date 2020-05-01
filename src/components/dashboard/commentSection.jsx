import React, { Component } from "react";
import { Comment, Avatar } from "antd";
// import CommentBox from "./commentBox";
import ReplyBox from "./replyBox";

class CommentSection extends Component {
  state = {
    isReply: false,
    replyValue: "nihao",
  };

  handleReplyClick = () => {
    if (this.state.isReply === false) return this.setState({ isReply: true });
    if (this.state.isReply === true) return this.setState({ isReply: false });
  };

  handleReplySubmit = (e) => {
    this.setState({
      replyValue: e.target.value,
    });
  };

  render() {
    const { isReply } = this.state;

    return (
      <Comment
        actions={[
          <span onClick={this.handleReplyClick} key="comment-nested-reply-to">
            Reply to
          </span>,
        ]}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            {/* We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure). */}
            {this.props.content}
          </p>
        }
      >
        {isReply && (
          <ReplyBox
            // onChange={(e) => this.props.onReply}
            // value={this.props.replyValue}
            replyValue={this.props.replyValue}
            replyButtonLoading={this.props.replyButtonLoading}
            disableCommentButton={this.props.disableCommentButton}
            submitButtonDisabled={this.props.submitButtonDisabled}
            onReplyChange={this.props.onReplyChange}
            onReplySubmit={this.props.onReplySubmit}
          />
        )}
        {this.props.children}
      </Comment>
    );
  }
}

export default CommentSection;
