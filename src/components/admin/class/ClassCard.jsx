import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const ClassCard = props => {
  return (
    <Link to="/dashboard/admin/classes/123">
      <Card
        title="线性代数"
        extra={<a href="#">View</a>}
        style={{ width: 280, marginBottom: "1em", opacity: "0.8" }}
        size="small"
      >
        <p>Monday 9:00-11:00</p>
      </Card>
    </Link>
  );
};

export default ClassCard;
