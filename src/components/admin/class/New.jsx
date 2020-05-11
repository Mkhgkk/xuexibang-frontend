import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, DatePicker } from "antd";

class New extends Component {
  state = {};

  render() {
    const {
      onClose,
      visible,
      mode,
      course,
      onSubmitAnnounce,
      onSubmitHomework,
      onChange
    } = this.props;
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
                  mode === "Announcement" ? onSubmitAnnounce : onSubmitHomework
                }
                type="primary"
              >
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <p style={{ fontWeight: 600 }}>{course.name}</p>

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
                  initialValues={{
                    ["content"]: null,
                    ["deadline"]: null
                  }}
                >
                  <Input.TextArea
                    name="content"
                    onChange={e => onChange("content", e.target.value)}
                    rows={8}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              {mode === "Homework" && (
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
                      onChange={e => onChange("deadline", e)}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default New;
