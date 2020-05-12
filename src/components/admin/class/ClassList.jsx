import React, { Component } from "react";
import ClassCard from "./ClassCard";
import { getAdminCourses } from "../../../services/courseService";
<<<<<<< HEAD
import { Empty } from "antd";
import AdminLoading from "./AdminLoading";
=======
>>>>>>> faf61631c8afc8d1d31e4461e91558b2e66c08c6

class ClassList extends Component {
  state = {
    courses: [],
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
    const { courses } = this.state;
    return (
      <div style={{ overflow: "scroll", height: "80vh" }}>
        {courses.map((course) => (
          <ClassCard course={course} key={course._id} />
        ))}
      </div>
    );
  }
}

export default ClassList;
