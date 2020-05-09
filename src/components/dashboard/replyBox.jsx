import React, { Component } from "react";
import { Comment, Avatar, Form, Button, Input } from "antd";

const { TextArea } = Input;

class ReplyBox extends Component {
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
            onChange={(e) => this.props.onReplyChange(e)}
            value={this.props.replyValue}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            disabled={this.props.submitButtonDisabled}
            loading={this.props.replyButtonLoading}
            onClick={this.props.onReplySubmit}
            type="primary"
          >
            Add Reply
          </Button>
        </Form.Item>
      </div>
    );
  };

  render() {
    const { Editor } = this;
    const { currentUser } = this.props;
    return (
      <Comment
        avatar={<Avatar src={currentUser.avatar} alt="Han Solo" />}
        content={<Editor />}
      />
    );
  }
}

export default ReplyBox;
