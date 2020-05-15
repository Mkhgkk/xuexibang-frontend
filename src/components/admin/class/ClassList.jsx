import React, { Component } from "react";
import ClassCard from "./ClassCard";
import { getAdminCourses } from "../../../services/courseService";
import AdminLoading from "./AdminLoading";
import { Empty } from "antd";

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
      console.log(ex);
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
            <Empty
              description="No class"
              style={{ position: "absolute", left: "150%", top: "25%" }}
            />
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
