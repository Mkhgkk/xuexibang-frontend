import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, DatePicker } from "antd";
import moment from "moment";

class Edit extends Component {
  state = {
    data: {}
  };

  componentDidMount = () => {
    this.setState({ data: this.props.data });
  };
  componentDidUpdate = prevProps => {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  };
  render() {
    const {
      onClose,
      visible,

      onChange,
      onSubmitAnnounce,
      onSubmitHomework
    } = this.props;

    const { data } = this.state;
    return (
      <div>
        {data && (
          <Drawer
            title={
              data.type === "announcement"
                ? "Edit announcement"
                : "Edit homework"
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
                    data.type === "announcement"
                      ? onSubmitAnnounce
                      : onSubmitHomework
                  }
                  type="primary"
                >
                  Save
                </Button>
              </div>
            }
          >
            <p style={{ fontWeight: 600 }}>{data.course && data.course.name}</p>

            <Row gutter={16}>
              <Col span={24}>
                <p>Description</p>
                <Input.TextArea
                  value={data.content}
                  name="content"
                  onChange={e => onChange("content", e.target.value)}
                  rows={8}
                  placeholder="please enter description"
                />
              </Col>
            </Row>
            {data.type === "homework" && (
              <Row>
                <Col span={24} style={{ marginTop: "2em" }}>
                  <p>Deadline</p>
                  <DatePicker
                    name="deadline"
                    showTime
                    onChange={e => onChange("deadline", e)}
                    value={moment(data.deadline)}
                  />
                </Col>
              </Row>
            )}
          </Drawer>
        )}
      </div>
    );
  }
}

export default Edit;
