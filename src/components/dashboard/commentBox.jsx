import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;

class CommentBox extends Component {
  state = {
    value: "",
    submitting: false,
  };

  componentDidMount = () => {
    this.props.disableCommentButton();
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = () => {
    if (this.state.submitting === true)
      return this.setState({ submitting: false });
    if (this.state.submitting === false)
      return this.setState({ submitting: true });
  };

  Editor = () => {
    return (
      <div>
        <Form.Item>
          <TextArea
            rows={1}
            onChange={(e) => this.props.onCommentChange(e)}
            value={this.props.value}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            disabled={this.props.submitButtonDisabled}
            loading={this.props.commentButtonLoading}
            onClick={this.props.onCommentSubmit}
            type="primary"
          >
            Add Comment
          </Button>
        </Form.Item>
      </div>
    );
  };

  render() {
    const { Editor } = this;
    return (
      <Comment
        avatar={<Avatar src={this.props.currentUser.avatar} alt="Han Solo" />}
        content={<Editor />}
      />
    );
  }
}

export default CommentBox;
