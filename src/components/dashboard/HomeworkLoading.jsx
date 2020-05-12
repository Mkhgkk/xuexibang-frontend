import React from "react";
import { Col, Card, Skeleton, Row } from "antd";

const HomeworkLoading = () => {
  return (
    <Row gutter={[32, 24]} style={{ marginTop: "2em" }}>
      {[...Array(8).keys()].map(s => (
        <Col span={6} key={s}>
          <Card style={{ width: 300 }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default HomeworkLoading;
