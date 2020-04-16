import React, { Component } from "react";

import { Drawer, Form, Button, Col, Row, Input, DatePicker } from "antd";

class New extends Component {
  state = {
    data: {}
  };

  onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  onOk = value => {
    console.log("onOk: ", value);
  };

  render() {
    const { onClose, visible } = this.props;
    return (
      <div>
        <Drawer
          title="Create an Announcement"
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
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <p style={{ fontWeight: 600 }}>线性代数 123456</p>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: "Please enter title" }]}
                >
                  <Input placeholder="Please enter title" />
                </Form.Item>
              </Col>
            </Row>

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
                    rows={6}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="deadline"
                  label="Deadline (optional)"
                  rules={[
                    {
                      required: false
                    }
                  ]}
                >
                  <DatePicker
                    showTime
                    onChange={this.onChange}
                    onOk={this.onOk}
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
