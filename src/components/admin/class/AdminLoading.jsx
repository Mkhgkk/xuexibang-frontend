import React from "react";
import { Skeleton, Card } from "antd";

const AdminLoading = () => {
  return (
    <div>
      {[...Array(4).keys()].map(s => (
        <Card
          style={{ width: 280, marginBottom: "1em", opacity: "0.8" }}
          size="small"
          key={s}
        >
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
      ))}
    </div>
  );
};

export default AdminLoading;
