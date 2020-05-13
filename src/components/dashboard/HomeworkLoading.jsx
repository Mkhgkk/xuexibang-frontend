import React from "react";
import { Col, Card, Skeleton, Row } from "antd";

const HomeworkLoading = ({ row }) => {
  return (
    <Row gutter={[32, 24]} style={{ marginTop: "2em" }}>
      {[...Array(8).keys()].map(s => (
        <Col span={6} key={s}>
          <Card style={{ width: 300 }}>
            <Skeleton active paragraph={{ rows: row }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default HomeworkLoading;
