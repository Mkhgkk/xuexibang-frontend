import React, { Component } from "react";
import { Descriptions, Button } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import ClassmateDrawer from "./ClassmateDrawer";
import { getUniversity } from "../../../services/universityService";
import { getMajor } from "../../../services/majorService";
import { getStudent } from "../../../services/courseService";

const inputStyle = {
  border: "none",
  color: "#722ed1",
  width: "100%"
};

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewClassMate: false,
      university: "",
      major: "",
      students: []
    };
  }

  componentDidUpdate = async () => {
    const { course } = this.props;
    if (
      this.state.university._id !== course.university ||
      this.state.major._id !== course.major
    ) {
      const { data: university } = await getUniversity(course.university);
      const { data: major } = await getMajor(course.major);
      const { data: students } = await getStudent(course._id);
      this.setState({
        university,
        major,
        students
      });
    }
  };

  toggleDrawer = () => {
    this.setState({
      viewClassMate: !this.state.viewClassMate
    });
  };

  // onClose = () => {
  //   this.setState({
  //     viewClassMate: false
  //   });
  // };

  render() {
    const { viewClassMate, university, major, students } = this.state;
    const { editMode, course, onChange, onSubmit } = this.props;

    return (
      <div style={{ overflow: "scroll", height: "60vh", paddingTop: "1em" }}>
        <Descriptions bordered size="middle" column={2}>
          <Descriptions.Item label="University">
            {university.name}
          </Descriptions.Item>
          <Descriptions.Item label="Major">{major.name}</Descriptions.Item>

          <Descriptions.Item label="Class Week">
            {editMode ? (
              <input
                style={inputStyle}
                value={course.weeks}
                name="weeks"
                onChange={onChange}
              />
            ) : (
              course.weeks
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Semester">
            {course.semester}
          </Descriptions.Item>
          <Descriptions.Item label="Professor">
            {editMode ? (
              <input
                style={inputStyle}
                value={course.laoshi}
                name="laoshi"
                onChange={onChange}
              />
            ) : (
              course.laoshi
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Classmate">
            <Button onClick={this.toggleDrawer} disabled={editMode}>
              <TeamOutlined />
              {students.length}
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Class Number">
            {course.number}
          </Descriptions.Item>
          <Descriptions.Item label="QQ number">
            {editMode ? (
              <input
                type="stringfclas"
                style={inputStyle}
                value={course.qqNumber}
                name="qqNumber"
                onChange={onChange}
              />
            ) : (
              course.qqNumber
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Class time">
            {editMode ? (
              <input
                style={inputStyle}
                value={course.time}
                name="time"
                onChange={onChange}
              />
            ) : (
              course.time
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Class room">
            {editMode ? (
              <input
                style={inputStyle}
                value={course.classroom}
                name="classroom"
                onChange={onChange}
              />
            ) : (
              course.classroom
            )}
          </Descriptions.Item>

          <Descriptions.Item span={3} label="Note">
            {editMode ? (
              <textarea
                style={inputStyle}
                value={course.notes}
                className="classDetailTextArea"
                name="notes"
                onChange={onChange}
              />
            ) : (
              course.notes
            )}
          </Descriptions.Item>
        </Descriptions>
        {editMode && (
          <Button
            type="primary"
            onClick={onSubmit}
            style={{ float: "right", marginTop: "2em" }}
          >
            Save
          </Button>
        )}
        <ClassmateDrawer
          visible={viewClassMate}
          onClose={this.toggleDrawer}
          students={students}
          courseName={course.name}
          admin={course.admin}
        />
      </div>
    );
  }
}
export default BasicInfo;
