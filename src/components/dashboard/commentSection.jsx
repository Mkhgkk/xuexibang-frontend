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

  checkCanReply = () => {
    return (
      this.props.canReply && (
        <span onClick={this.handleReplyClick} key="comment-nested-reply-to">
          Reply to
        </span>
      )
    );
  };

  render() {
    const { isReply } = this.state;
    const { postedBy } = this.props;
    const { currentUser } = this.props;

    return (
      <Comment
        actions={[this.checkCanReply()]}
        author={<a>{postedBy.userName}</a>}
        avatar={
          <Avatar
            src={this.props.postedBy.avatar}
            alt={this.props.postedBy.userName}
          />
        }
        content={<p>{this.props.content}</p>}
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
            currentUser={currentUser}
          />
        )}
        {this.props.children}
      </Comment>
    );
  }
}

export default CommentSection;
