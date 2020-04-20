import React, { Component } from "react";
import { List, Avatar } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Edit from "./Edit";
import CommentBox from "./../../dashboard/commentBox";
import CommentSection from "./../../dashboard/commentSection";

class ListCard extends Component {
  state = {
    viewEdit: false,
  };

  onClose = () => {
    this.setState({
      viewEdit: false,
    });
  };

  render() {
    const { listData, mode } = this.props;
    const { viewEdit } = this.state;

    return (
      <>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.userName}
                description={item.date}
              />
              <div>
                <di>{item.content}</di>

                <div>
                  <ul className="ant-list-item-action">
                    <li>
                      <div>
                        <MessageOutlined style={{ marginRight: 8 }} /> 2
                      </div>
                      <em className="ant-list-item-action-split"></em>
                    </li>
                    <li>
                      <div>
                        {item.deadline && <p>Deadline: {item.deadline}</p>}
                      </div>
                      <em className="ant-list-item-action-split"></em>
                    </li>
                    <li>
                      <div>
                        <p
                          onClick={() => {
                            this.setState({ viewEdit: true });
                          }}
                        >
                          Edit
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

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
                            this.props.handleReplySubmit(item._id, comment._id)
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
              </div>
              <Edit
                visible={viewEdit}
                mode={mode}
                onClose={this.onClose}
                data={item}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}
export default ListCard;
