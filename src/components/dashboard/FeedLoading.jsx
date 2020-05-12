import React from "react";
import { Card, Skeleton } from "antd";

const FeedLoading = () => {
  return (
    <div>
      <>
        <Card
          style={{
            width: "60%",
            margin: "0 auto",
            marginTop: 16
          }}
        >
          <Skeleton loading={true} avatar active paragraph={{ rows: 6 }} />
        </Card>
        <Card
          style={{
            width: "60%",
            margin: "0 auto",
            marginTop: 16
          }}
        >
          <Skeleton loading={true} avatar active paragraph={{ rows: 6 }} />
        </Card>
      </>
    </div>
  );
};

export default FeedLoading;
