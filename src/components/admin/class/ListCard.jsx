import React, { Component } from "react";
import { List, Avatar } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import CommentBox from "./../../dashboard/commentBox";
import CommentSection from "./../../dashboard/commentSection";
import moment from "moment";

class ListCard extends Component {
  state = {
    viewEdit: false,
    box: false,
    data: this.props.listData,
  };

  componentDidUpdate = () => {
    if (this.props.listData !== this.state.data) {
      this.setState({ data: this.props.listData });
    }
  };

  handleCommentClick = (itemId) => {
    const box = this.state.box;
    this.setState({ box: box === true ? false : true });
  };

  render() {
    const { mode, auth, onOpenEdit } = this.props;
    const { data } = this.state;

    return (
      <>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.postedBy && item.postedBy.avatar} />}
                title={item.postedBy && item.postedBy.userName}
                description={moment(item.datePosted).calendar()}
              />
              <div>
                <di>{item.content}</di>

                <div>
                  <ul className="ant-list-item-action">
                    <li>
                      <div onClick={() => this.props.onCommentToggle(item._id)}>
                        <MessageOutlined style={{ marginRight: 8 }} /> 2
                      </div>
                      <em className="ant-list-item-action-split"></em>
                    </li>
                    {mode === "Homework" && (
                      <li>
                        <div>
                          <p>
                            Deadline:
                            {moment(item.deadline).add(0, "days").calendar()}
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
                            this.props.handleCommentSubmit(item._id)
                          }
                          value={this.props.commentValue}
                          onCommentChange={this.props.handleCommentChange}
                        />
                        {item.comments.map((comment) => (
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
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
      </>
    );
  }
}
export default ListCard;
