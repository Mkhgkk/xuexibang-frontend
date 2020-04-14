import React, { Component } from "react";
import { Skeleton, Card, Avatar, Tag } from "antd";
import CommentSection from "./commentSection";
import Actions from "./actions";
import CommentBox from "./commentBox";

class CardBox extends Component {
  state = {
    loading: false,
    comment: false,
    commentValue: "",
    replyValue: "",
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
  };

  onChange = (checked) => {
    this.setState({ loading: !checked });
  };
  handleClick = () => {
    if (this.state.comment === true) return this.setState({ comment: false });
    if (this.state.comment === false) return this.setState({ comment: true });
  };

  handleCommentChange = (e) => {
    this.setState({
      commentValue: e.target.value,
    });
  };

  handleSubmit = () => {
    const comments = [
      { content: this.state.commentValue },
      ...this.state.comments,
    ];
    this.setState({ comments: comments, commentValue: "" });
  };

  handleReplyChange = (e) => {
    this.setState({
      replyValue: e.target.value,
    });
  };

  handleReplySubmit = (commentId) => {
    const comments = [...this.state.comments];
    const comment = comments.filter((comment) => comment._id === commentId);

    comment[0]["replies"].unshift({
      _id: new Date(),
      content: this.state.replyValue,
    });
    this.setState({ comments: comments, replyValue: " " });
  };

  render() {
    const { loading, comment, comments } = this.state;
    return (
      <>
        <Card
          style={{ width: "60%", margin: "0 auto", marginTop: 16 }}
          // actions={[
          //   <span>
          //     <Tooltip title="Comment">
          //       <CommentOutlined />
          //     </Tooltip>
          //     <span> 23 Comments</span>
          //   </span>,
          //   <div>3days left</div>,
          // ]}
        >
          <Skeleton loading={loading} avatar active>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ height: "40px" }}>
                <Tag color="green">homework</Tag>
              </div>

              <h1>Database Management</h1>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <div
                style={{
                  marginLeft: "1em",
                  textAlign: "left",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    // paddingLeft: "0.5em",
                    // fontWeight: "bolder",
                  }}
                >
                  userName
                </h2>
                <p style={{ textAlign: "left" }}>7th Sep 2020</p>
              </div>
            </div>
            <p style={{ margin: "30px 50px 30px 50px" }}>
              This is a common workflow for short-lived topic branches that are
              used more as an isolated development than an organizational tool
              for longer-running features.
            </p>
            <Actions
              onClick={this.handleClick}
              commentCount={this.state.comments.length}
            />
            {comment && (
              <React.Fragment>
                <CommentBox
                  onCommentSubmit={this.handleSubmit}
                  value={this.state.commentValue}
                  onCommentChange={this.handleCommentChange}
                />
                {comments.map((comment) => (
                  <CommentSection
                    key={comment._id}
                    content={comment.content}
                    replyValue={this.state.replyValue}
                    onReplyChange={this.handleReplyChange}
                    onReplySubmit={() => this.handleReplySubmit(comment._id)}
                  >
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <CommentSection
                          key={reply._id}
                          content={reply.content}
                        />
                      ))}
                  </CommentSection>
                ))}
              </React.Fragment>
            )}
          </Skeleton>
        </Card>
      </>
    );
  }
}

export default CardBox;
