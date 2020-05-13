import React, { Component } from "react";
import { Card } from "antd";
import { getStudent } from "../../services/courseService";
import defaultThumbnail from "../../image/thumbnail4.svg";

class Class extends Component {
  state = { students: [] };

  componentDidMount = async () => {
    const { course } = this.props;
    const { data: students } = await getStudent(course._id);
    this.setState({ students });
  };

  render() {
    const { Meta } = Card;
    const { course } = this.props;
    const { students } = this.state;

    const thumbnail = course.thumbnail ? (
      <div style={{ width: 300, height: 250, overflow: "hidden" }}>
        <img
          alt="thumbnail"
          src={course.thumbnail}
          style={{ width: 300, height: "auto" }}
        />
      </div>
    ) : (
      <div style={{ width: 300, height: 250, overflow: "hidden" }}>
        <img
          alt="default"
          src={defaultThumbnail}
          style={{ width: 300, height: "auto" }}
        />
      </div>
    );

    return (
      <Card hoverable="true" style={{ width: 300 }} cover={thumbnail}>
        <Meta
          title={course.name}
          description={[
            <div>Teacher' name: {course.laoshi}</div>,
            <div>Number of students: {students.length}</div>,
            <div>Classroom: {course.classroom}</div>,
            <div>QQ group: {course.qqNumber}</div>
          ]}
        />
      </Card>
    );
  }
}

export default Class;
