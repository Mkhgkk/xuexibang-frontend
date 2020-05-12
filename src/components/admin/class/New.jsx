import React from "react";
import { Drawer, Button, Col, Row, Input, DatePicker } from "antd";

const New = props => {
  const {
    onClose,
    visible,
    mode,
    course,
    onSubmitAnnounce,
    onSubmitHomework,
    onChange,
    new: value
  } = props;

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
        <p style={{ fontWeight: 600 }}>{course.name}</p>

        <Row gutter={16}>
          <Col span={24}>
            <p>Description</p>
            <Input.TextArea
              value={value.content}
              name="content"
              onChange={e => {
                onChange("content", e.target.value);
              }}
              rows={8}
              placeholder="please enter description"
            />
          </Col>
        </Row>
        <Row>
          {mode === "Homework" && (
            <Col span={24} style={{ marginTop: "2em" }}>
              <p>Deadline</p>
              <DatePicker
                name="deadline"
                showTime
                onChange={e => {
                  onChange("deadline", e);
                }}
                value={value.deadline}
              />
            </Col>
          )}
        </Row>
      </Drawer>
    </div>
  );
};

export default New;
