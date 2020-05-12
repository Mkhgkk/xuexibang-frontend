import React, { Component } from "react";
import ClassCard from "./ClassCard";
import { getAdminCourses } from "../../../services/courseService";
import { Empty, message } from "antd";
import AdminLoading from "./AdminLoading";

class ClassList extends Component {
  state = {
    courses: [],
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const { data: courses } = await getAdminCourses();
      this.setState({ courses, loading: false });
    } catch (ex) {
      message.error("Something went to wrong");
    }
  };

  render() {
    const { courses, loading } = this.state;
    return (
      <div style={{ overflow: "scroll", height: "80vh" }}>
        {loading ? (
          <AdminLoading />
        ) : (
          courses.length === 0 && (
            <div
              style={{
                position: "absolute",
                left: "150%",
                top: "20%"
              }}
            >
              <Empty description="No class" />
            </div>
          )
        )}
        {courses.map(course => (
          <ClassCard course={course} key={course._id} />
        ))}
      </div>
    );
  }
}

export default ClassList;
