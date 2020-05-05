import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const ClassCard = ({ course }) => {
  return (
    <Link to={`/dashboard/admin/classes/${course._id}`}>
      <Card
        title={course.name}
        extra={<a href="#">View</a>}
        style={{ width: 280, marginBottom: "1em", opacity: "0.8" }}
        size="small"
      >
        <p>{course.time}</p>
      </Card>
    </Link>
  );
};

export default ClassCard;
