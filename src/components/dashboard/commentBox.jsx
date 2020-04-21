import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";

const { TextArea } = Input;

class CommentBox extends Component {
  state = {
    value: "",
    submitting: false
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
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
            onChange={e => this.props.onCommentChange(e)}
            value={this.props.value}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={this.state.submitting}
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
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={<Editor />}
      />
    );
  }
}

export default CommentBox;
