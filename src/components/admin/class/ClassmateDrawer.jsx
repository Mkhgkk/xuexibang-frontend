import React from "react";
import { Drawer } from "antd";
import StudentList from "./StudentList";

const ClassmateDrawer = props => {
  const { visible, onClose, students, courseName, admin } = props;
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
          <StudentList student={student} admin={admin} key={student._id} />
        ))}
      </Drawer>
    </div>
  );
};

export default ClassmateDrawer;
