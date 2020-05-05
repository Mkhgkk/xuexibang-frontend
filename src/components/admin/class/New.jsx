import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  message
} from "antd";
import { newFeed } from "../../../services/feedService";

class New extends Component {
  state = {
    content: "",
    deadline: ""
  };

  onSubmitAnnounce = async e => {
    e.preventDefault();
    const { course } = this.props;

    const feed = {
      type: "announcement",
      course: course._id,
      content: this.state.content,
      deadline: this.state.deadline.toJSON()
    };
    try {
      await newFeed(feed);
      this.success();
      this.props.onClose();
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  onSubmitHomework = value => {
    console.log("onOk: ", value);
    this.success();
    this.props.onClose();
  };

  success = () => {
    message.success(`${this.props.mode} has been posted.`);
  };

  render() {
    const { onClose, visible, mode, course } = this.props;
    return (
      <div>
        <Drawer
          title={
            mode === "Announcement"
              ? "Create an announcement"
              : "Create a homework"
          }
          width={600}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          placement="left"
          footer={
            <div
              style={{
                textAlign: "right"
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                onClick={
                  mode === "Announcement"
                    ? this.onSubmitAnnounce
                    : this.onSubmitHomework
                }
                type="primary"
              >
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <p style={{ fontWeight: 600 }}>
              {course.name} {course.number}
            </p>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter description"
                    }
                  ]}
                >
                  <Input.TextArea
                    name="content"
                    onChange={e => {
                      this.setState({ content: e.target.value });
                    }}
                    rows={8}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="deadline"
                  label={
                    mode === "Announcement" ? "Deadline (optional)" : "Deadline"
                  }
                  rules={[
                    {
                      required: false
                    }
                  ]}
                >
                  <DatePicker
                    name="deadline"
                    showTime
                    onChange={e => {
                      this.setState({ deadline: e });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default New;
