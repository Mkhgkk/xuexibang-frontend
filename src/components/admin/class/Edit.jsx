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

class Edit extends Component {
  state = {
    data: {
      date: "",
      content: "",
      deadline: ""
    }
  };

  componentDidMount = () => {
    const data = {
      date: this.props.data.date,
      content: this.props.data.content,
      deadline: this.props.data.deadline
    };
    this.setState({
      data
    });
  };

  onChangeTime = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  onChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  onSubmitAnnounce = value => {
    console.log("onOk: ", value);
    this.success();
    this.props.onClose();
  };

  onSubmitHomework = value => {
    console.log("onOk: ", value);
    this.success();
    this.props.onClose();
  };

  success = () => {
    message.success(`${this.props.mode} has been changed.`);
  };

  render() {
    const { onClose, visible, mode } = this.props;
    const { data } = this.state;

    return (
      <div>
        <Drawer
          title={
            mode === "Announcement" ? "Edit announcement" : "Edit homework"
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
                Save
              </Button>
            </div>
          }
        >
          <Form
            layout="vertical"
            hideRequiredMark
            initialValues={{
              ["description"]: data.content
              // ["deadline"]: data.deadline
            }}
          >
            <p style={{ fontWeight: 600 }}>线性代数 123456</p>

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
                    onChange={this.onChange}
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
                  label="Deadline"
                  rules={[
                    {
                      required: false
                    }
                  ]}
                >
                  <DatePicker
                    name="deadline"
                    showTime
                    onChange={this.onChangeTime}
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

export default Edit;
