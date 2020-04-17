import React from "react";
import { Row, Col, Avatar, Tooltip, Space } from "antd";
import { MessageOutlined, StarFilled } from "@ant-design/icons";

const StudentList = ({ student }) => {
  return (
    <Row style={{ marginBottom: "1em" }}>
      <Col span={6}>
        <Avatar size="large" src={student.avatar} />
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        {student.name}
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
          {student.manage && (
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
