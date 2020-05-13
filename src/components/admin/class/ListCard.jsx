import React, { Component } from "react";
import { List, Avatar, Spin, message } from "antd";
import {
  MessageOutlined,
  LoadingOutlined,
  UserOutlined
} from "@ant-design/icons";
import CommentBox from "./../../dashboard/commentBox";
import CommentSection from "./../../dashboard/commentSection";
import moment from "moment";
import CommentContext from "./../../../context/commentContext";
import UserContext from "../../../context/userContext";
import { getComments, postComment } from "./../../../services/commentService";
import { getReplies, postReply } from "./../../../services/replyService";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class ListCard extends Component {
  static contextType = CommentContext;
  state = {
    viewEdit: false,
    box: false,
    data: this.props.listData
  };

  componentDidMount = () => {
    console.log(this.context);
  };

  componentDidUpdate = () => {
    if (this.props.listData !== this.state.data) {
      this.setState({ data: this.props.listData });
    }
  };

  disableCommentButton = (feedId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    feed.submitButtonDisabled = true;
    // this.setState({ feeds });
    this.context.updateState(mode, feeds);
  };

  handleCommentClick = (feedId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    feed.comment = feed.comment === true ? false : true;
    feed.commmentLoading = feed.commmentLoading === true ? false : true;
    this.context.updateState(mode, feeds);
  };

  handleCommentChange = (e, feedId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    feed.commentValue = e.target.value;
    feed.submitButtonDisabled =
      feed.commentValue === "" || undefined ? true : false;
    this.context.updateState(mode, feeds);
  };

  handleCommentSubmit = (feedId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);

    feed.commentButtonLoading = true;

    this.context.updateState(mode, feeds);

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

  fetchComments = (feedId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);

    const setComments = async feedId => {
      const { data } = await getComments(feedId);
      feed.comments = data;
      feed.commmentLoading = false;
      this.context.updateState(mode, feeds);
    };

    setComments(feedId);
  };

  disableReplyButton = (feedId, commentId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    comment.submitButtonDisabled = true;
    this.context.updateState(mode, feeds);
  };

  fetchReplies = (feedId, commentId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    const setReplies = async commentId => {
      const { data } = await getReplies(commentId);
      comment.replies = data;
      // comment.commmentLoading = false;
      this.context.updateState(mode, feeds);
    };

    setReplies(commentId);
  };

  handleReplyChange = (e, feedId, commentId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    comment.replyValue = e.target.value;

    comment.submitButtonDisabled =
      comment.replyValue === "" || undefined ? true : false;

    this.context.updateState(mode, feeds);
  };

  handleReplySubmit = (feedId, commentId, mode) => {
    let feeds = [...this.context.state[mode]];
    let feed = feeds.find(feed => feed._id === feedId);
    let comment = feed.comments.find(comment => comment._id === commentId);

    comment.replyButtonLoading = true;

    this.context.updateState(mode, feeds);

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

        this.context.updateState(mode, feeds);
      } catch (ex) {
        console.log(ex);
        message.error("Something went wrong, please try again!");
      }
    };

    postAndSetReply(commentId);
  };

  render() {
    const { mode, auth, onOpenEdit } = this.props;
    const { data } = this.state;

    return (
      <CommentContext.Consumer>
        {value => (
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={item => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.postedBy && item.postedBy.avatar}
                      style={{
                        backgroundColor: "#9254de"
                      }}
                      icon={<UserOutlined />}
                    />
                  }
                  title={item.postedBy && item.postedBy.userName}
                  description={moment(item.datePosted).calendar()}
                />
                <div>
                  <di>{item.content}</di>

                  <div>
                    <ul className="ant-list-item-action">
                      <li>
                        <div
                          onClick={() =>
                            this.handleCommentClick(item._id, mode)
                          }
                        >
                          <MessageOutlined style={{ marginRight: 8 }} /> 2
                        </div>
                        <em className="ant-list-item-action-split"></em>
                      </li>
                      {mode === "homework" && (
                        <li>
                          <div>
                            <p>
                              Deadline:
                              {moment(item.deadline)
                                .add(0, "days")
                                .calendar()}
                            </p>
                          </div>
                          <em className="ant-list-item-action-split"></em>
                        </li>
                      )}
                      {item.postedBy && item.postedBy._id === auth._id && (
                        <li>
                          <div>
                            <p
                              onClick={() => {
                                onOpenEdit(item);
                              }}
                            >
                              Edit
                            </p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  {item.commentToggler && (
                    <div>
                      {item.comments && (
                        <React.Fragment>
                          <CommentBox
                            onCommentSubmit={() =>
                              this.props.handleCommentSubmit(item._id, mode)
                            }
                            value={this.props.commentValue}
                            onCommentChange={this.props.handleCommentChange}
                          />
                          {item.comments.map(comment => (
                            <CommentSection
                              key={comment._id}
                              content={comment.content}
                              replyValue={this.props.replyValue}
                              onReplyChange={this.props.handleReplyChange}
                              onReplySubmit={() =>
                                this.props.handleReplySubmit(
                                  item._id,
                                  comment._id
                                )
                              }
                            >
                              {comment.replies &&
                                comment.replies.map(reply => (
                                  <CommentSection
                                    key={reply._id}
                                    content={reply.content}
                                  />
                                ))}
                            </CommentSection>
                          ))}
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </div>
                <UserContext.Consumer>
                  {user => (
                    <div>
                      {item.comment && (
                        <React.Fragment>
                          <CommentBox
                            onCommentSubmit={() =>
                              this.handleCommentSubmit(item._id, mode)
                            }
                            commentButtonLoading={item.commentButtonLoading}
                            disableCommentButton={() =>
                              this.disableCommentButton(item._id, mode)
                            }
                            submitButtonDisabled={item.submitButtonDisabled}
                            value={item.commentValue}
                            onCommentChange={e =>
                              this.handleCommentChange(e, item._id, mode)
                            }
                            currentUser={user.currentUser}
                          />

                          {/* comment loading spinner */}
                          {item.commmentLoading && (
                            <div style={{ textAlign: "center" }}>
                              <Spin size="small" indicator={loadingIcon} />
                            </div>
                          )}

                          {/* comments */}

                          {!item.comments
                            ? this.fetchComments(item._id, mode)
                            : item.comments.map(comment => (
                                <CommentSection
                                  key={comment._id}
                                  content={comment.content}
                                  replyValue={comment.replyValue}
                                  onReplyChange={e =>
                                    this.handleReplyChange(
                                      e,
                                      item._id,
                                      comment._id,
                                      mode
                                    )
                                  }
                                  replyButtonLoading={
                                    comment.replyButtonLoading
                                  }
                                  submitButtonDisabled={
                                    comment.submitButtonDisabled
                                  }
                                  disableCommentButton={() =>
                                    this.disableReplyButton(
                                      item._id,
                                      comment._id,
                                      mode
                                    )
                                  }
                                  onReplySubmit={() =>
                                    this.handleReplySubmit(
                                      item._id,
                                      comment._id,
                                      mode
                                    )
                                  }
                                  canReply={true}
                                  postedBy={item.postedBy}
                                  currentUser={user.currentUser}
                                >
                                  {/* reply loading spinner */}
                                  {/* {comment && (
                            <div style={{ textAlign: "center" }}>
                              <Spin size="small" indicator={loadingIcon} />
                            </div>
                          )} */}
                                  {!comment.replies
                                    ? this.fetchReplies(
                                        item._id,
                                        comment._id,
                                        mode
                                      )
                                    : comment.replies.map(reply => (
                                        <CommentSection
                                          key={reply._id}
                                          content={reply.content}
                                          postedBy={reply.postedBy}
                                        />
                                      ))}
                                </CommentSection>
                              ))}
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </UserContext.Consumer>
              </List.Item>
            )}
          />
        )}
      </CommentContext.Consumer>
    );
  }
}
export default ListCard;
