import React from "react";
import { Row, Col, Avatar, Tooltip, Space } from "antd";
import { MessageOutlined, StarFilled, UserOutlined } from "@ant-design/icons";

const StudentList = ({ student, admin }) => {
  return (
    <Row style={{ marginBottom: "1em" }}>
      <Col span={6}>
        <Avatar
          size="large"
          src={student.avatar}
          style={{
            backgroundColor: "#9254de"
          }}
          icon={<UserOutlined />}
        />
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        {student.userName}
      </Col>
      <Col
        span={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <Space size="small">
          {admin.includes(student._id) && (
            <Tooltip title="班长">
              <StarFilled style={{ fontSize: "1.3em" }} />
            </Tooltip>
          )}
          <MessageOutlined className="msgHover" style={{ fontSize: "1.3em" }} />
        </Space>
      </Col>
    </Row>
  );
};

export default StudentList;
