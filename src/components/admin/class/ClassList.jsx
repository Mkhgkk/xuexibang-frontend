<<<<<<< HEAD
import React, { Component } from "react";
import ClassCard from "./ClassCard";
import { getAdminCourses } from "../../../services/courseService";

class ClassList extends Component {
  state = {
    courses: []
  };

  componentDidMount = async () => {
    const { data: courses } = await getAdminCourses();
    this.setState({ courses });
  };
  render() {
    const { courses } = this.state;
    return (
      <div style={{ overflow: "scroll", height: "80vh" }}>
        {courses.map(course => (
          <ClassCard course={course} />
        ))}
      </div>
    );
  }
}

export default ClassList;
=======
import React, { Component } from "react";
import ClassCard from "./ClassCard";
import { getAdminCourses } from "../../../services/courseService";

class ClassList extends Component {
  state = {
    courses: []
  };

  componentDidMount = async () => {
    const { data: courses } = await getAdminCourses();
    this.setState({ courses });
  };
  render() {
    const { courses } = this.state;
    return (
      <div style={{ overflow: "scroll", height: "80vh" }}>
        {courses.map(course => (
          <ClassCard course={course} key={course._id} />
        ))}
      </div>
    );
  }
}

export default ClassList;
>>>>>>> doggie
