import React, { Component } from "react";
import { Drawer } from "antd";
import StudentList from "./StudentList";

class ClassmateDrawer extends Component {
  render() {
    const { visible, onClose, students, courseName, admin } = this.props;

    return (
      <div>
        <Drawer
          title={`Students in ${courseName}`}
          placement="right"
          onClose={onClose}
          visible={visible}
          placement="left"
          style={{ overflow: "scroll", height: "100vh" }}
        >
          {students.map(student => (
            <StudentList student={student} admin={admin} />
          ))}
        </Drawer>
      </div>
    );
  }
}

export default ClassmateDrawer;
