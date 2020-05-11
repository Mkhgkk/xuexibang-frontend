import React, { Component } from "react";
import { Card, Divider, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  TeamOutlined
} from "@ant-design/icons";
import HomeworkList from "./HomeworkList";
import ClassmateDrawer from "../admin/class/ClassmateDrawer";
import * as courseService from "../../services/courseService";
import * as feedService from "../../services/feedService";
import * as userSerivce from "../../services/userService";

class ClassDetails extends Component {
  state = {
    viewClassMate: false,
    course: {},
    students: [],
    homework: [],
    announcement: [],
    myCourses: []
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const { data: user } = await userSerivce.getUserDetail();
    const { data: course } = await courseService.getCourse(id);
    const { data: students } = await courseService.getStudent(id);
    const { data: homework } = await feedService.getHomeworkById(id);
    const { data: announcement } = await feedService.getAnnouncementById(id);
    this.setState({
      course,
      students,
      homework,
      announcement,
      myCourses: user.courses
    });
  };

  toggleDrawer = () => {
    this.setState({
      viewClassMate: !this.state.viewClassMate
    });
  };

  handleDelete = async () => {
    let myCourses = [...this.state.myCourses];
    myCourses = myCourses.filter(x => x !== this.state.course._id);
    this.setState({ myCourses });
    try {
      await userSerivce.changeUserInfo({ courses: myCourses });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
    this.props.history.replace("/dashboard/classes");
    message.success("Class has been deleted!");
  };

  render() {
    const { Meta } = Card;
    const {
      course,
      students,
      viewClassMate,
      homework,
      announcement
    } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <Card
          style={{ width: 800, margin: "auto" }}
          cover={<img alt="thumbnail" src={course.thumbnail} />}
          actions={[
            <div onClick={this.toggleDrawer}>
              <TeamOutlined key="share" style={{ marginRight: "1em" }} />
              {students.length}
            </div>,
            <Popconfirm
              title="Are you sure you want to delete this?"
              onConfirm={this.handleDelete}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <DeleteOutlined key="ellipsis" />
            </Popconfirm>
          ]}
        >
          <Meta
            title={course.name}
            description={[
              <div>Class number: {course.number}</div>,
              <div>Semester:{course.semester}</div>,
              <div>Teacher' name: {course.laoshi}</div>,
              <div>Weeks: {course.weeks}</div>,
              <div>Time: {course.time}</div>,
              <div>Classroom: {course.classroom}</div>,
              <div>QQ group: {course.qqNumber}</div>,
              <div>Notes: {course.notes}</div>,
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Homework
              </Divider>,
              <HomeworkList type={1} courseId={course._id} data={homework} />,
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Announcements
              </Divider>,
              <HomeworkList courseId={course._id} data={announcement} />
            ]}
          />
        </Card>
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

export default ClassDetails;
