import React, { Component } from "react";
import { Skeleton, Card, Avatar, Tag, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CommentSection from "./commentSection";
import Actions from "./actions";
import CommentBox from "./commentBox";
import { getFeeds } from "./../../services/feedService";
import { getComments, postComment } from "./../../services/commentService";
import { getReplies, postReply } from "./../../services/replyService";
import moment from "moment";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class CardBox extends Component {
  state = {
    feeds: [],
    loading: false,
    commentValue: "",
    replyValue: ""
  };

  componentDidMount = async () => {
    try {
      const { data } = await getFeeds();
      this.setState({ feeds: data });
    } catch (ex) {
      console.log(ex);
    }
  };

  fetchComments = feedId => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);

    const setComments = async feedId => {
      const { data } = await getComments(feedId);
      feed.comments = data;
      feed.commmentLoading = false;
      this.setState({ feeds });
    };

    setComments(feedId);
  };

  fetchReplies = (feedId, commentId) => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    const setReplies = async commentId => {
      const { data } = await getReplies(commentId);
      comment.replies = data;
      // comment.commmentLoading = false;
      this.setState({ feeds });
    };

    setReplies(commentId);
  };

  handleCommentClick = feedId => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    feed.comment = feed.comment === true ? false : true;
    feed.commmentLoading = feed.commmentLoading === true ? false : true;
    this.setState({ feeds });
  };

  handleCommentChange = (e, feedId) => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    feed.commentValue = e.target.value;
    feed.submitButtonDisabled =
      feed.commentValue === "" || undefined ? true : false;
    this.setState({ feeds });
  };

  disableCommentButton = feedId => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    feed.submitButtonDisabled = true;
    this.setState({ feeds });
  };

  disableReplyButton = (feedId, commentId) => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    comment.submitButtonDisabled = true;
    this.setState({ feeds });
  };

  handleCommentSubmit = feedId => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);

    feed.commentButtonLoading = true;

    this.setState({ feeds });

    const postAndSetComment = async feedId => {
      try {
        const { data } = await postComment(feedId, feed.commentValue);

        if (!feed.comments) {
          feed.comments = [{ data }];
        } else {
          feed.comments.unshift(data);
        }

        feed.commentValue = "";
        feed.commentButtonLoading = false;
        feed.submitButtonDisabled = true;

        this.setState({ feeds });
      } catch (ex) {
        message.error("Something went wrong, please try again!");
      }
    };

    postAndSetComment(feedId);
  };

  handleReplyChange = (e, feedId, commentId) => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    comment.replyValue = e.target.value;

    comment.submitButtonDisabled =
      comment.replyValue === "" || undefined ? true : false;

    this.setState({ feeds });
  };

  handleReplySubmit = (feedId, commentId) => {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    comment.replyButtonLoading = true;

    this.setState({ feeds });

    const postAndSetReply = async commentId => {
      try {
        const { data } = await postReply(commentId, comment.replyValue);

        if (!comment.replies) {
          comment.replies = [{ data }];
        } else {
          comment.replies.unshift(data);
        }

        comment.replyValue = "";
        comment.replyButtonLoading = false;
        comment.submitButtonDisabled = true;

        this.setState({ feeds });
      } catch (ex) {
        console.log(ex);
        message.error("Something went wrong, please try again!");
      }
    };

    postAndSetReply(commentId);
  };

  render() {
    const { loading, feeds } = this.state;
    return (
      <>
        {feeds.map(feed => (
          <Card
            key={feed._id}
            style={{ width: "60%", margin: "0 auto", marginTop: 16 }}
          >
            <Skeleton loading={loading} avatar active>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div style={{ height: "40px" }}>
                  <Tag color={feed.type === "homework" ? "orange" : "green"}>
                    {feed.type}
                  </Tag>
                </div>

                <h1>{feed.course.name}</h1>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <div
                  style={{
                    marginLeft: "1em",
                    textAlign: "left"
                  }}
                >
                  <h2
                    style={{
                      margin: 0
                      // paddingLeft: "0.5em",
                      // fontWeight: "bolder",
                    }}
                  >
                    {feed.postedBy.userName}
                  </h2>
                  <p style={{ textAlign: "left" }}>
                    {moment(feed.datePosted).calendar()}
                  </p>
                </div>
              </div>
              <p style={{ margin: "30px 50px 30px 50px" }}>{feed.content}</p>
              <Actions
                onClick={() => this.handleCommentClick(feed._id)}
                commentCount={2}
              />
              {feed.comment && (
                <React.Fragment>
                  <CommentBox
                    onCommentSubmit={() => this.handleCommentSubmit(feed._id)}
                    commentButtonLoading={feed.commentButtonLoading}
                    disableCommentButton={() =>
                      this.disableCommentButton(feed._id)
                    }
                    submitButtonDisabled={feed.submitButtonDisabled}
                    value={feed.commentValue}
                    onCommentChange={e => this.handleCommentChange(e, feed._id)}
                  />
                  {/* comment loading spinner */}
                  {feed.commmentLoading && (
                    <div style={{ textAlign: "center" }}>
                      <Spin size="small" indicator={loadingIcon} />
                    </div>
                  )}
                  {/* commets */}
                  {!feed.comments
                    ? this.fetchComments(feed._id)
                    : feed.comments.map(comment => (
                        <CommentSection
                          key={comment._id}
                          content={comment.content}
                          replyValue={comment.replyValue}
                          onReplyChange={e =>
                            this.handleReplyChange(e, feed._id, comment._id)
                          }
                          replyButtonLoading={comment.replyButtonLoading}
                          submitButtonDisabled={comment.submitButtonDisabled}
                          disableCommentButton={() =>
                            this.disableReplyButton(feed._id, comment._id)
                          }
                          onReplySubmit={() =>
                            this.handleReplySubmit(feed._id, comment._id)
                          }
                        >
                          {/* reply loading spinner */}
                          {/* {comment && (
                            <div style={{ textAlign: "center" }}>
                              <Spin size="small" indicator={loadingIcon} />
                            </div>
                          )} */}
                          {!comment.replies
                            ? this.fetchReplies(feed._id, comment._id)
                            : comment.replies.map(reply => (
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
        ))}
      </>
    );
  }
}

export default CardBox;
