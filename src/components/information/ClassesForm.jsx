import React, { Component } from "react";
import { Space, Button, Input, Form, Tag, message } from "antd";
import ClassList from "./ClassList";
import { getSearchedCourse } from "../../services/courseService";
import * as userSerivce from "../../services/userService";

const { Search } = Input;

class ClassesForm extends Component {
  state = {
    loading: false,
    courses: null,
    classNumber: "",
    userCourses: []
  };

  componentDidMount = async () => {
    const { data: user } = await userSerivce.getUserDetail();
    this.setState({
      userCourses: user.courses
    });
  };

  addCourse = courseId => {
    const userCourses = [courseId, ...this.state.userCourses];
    this.setState({ userCourses });
  };

  removeCourse = courseId => {
    let userCourses = [...this.state.userCourses];
    userCourses = userCourses.filter(x => x !== courseId);
    this.setState({ userCourses });
  };

  onSubmit = async () => {
    const { userCourses } = this.state;
    try {
      await userSerivce.changeUserInfo({ courses: userCourses });
      window.location = "/dashboard/feeds";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  onSearch = async () => {
    const { classNumber: number } = this.state;
    this.setState({ loading: true });

    try {
      const { data: courses } = await getSearchedCourse(number);
      this.setState({ courses, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  render() {
    const { currentStep, onBackButton } = this.props;
    const { courses, userCourses, loading } = this.state;

    return (
      <div style={{ marginBottom: "5em" }}>
        <Form
          style={{
            width: 400,
            marginTop: "3em",
            marginBottom: "2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h2 style={{ textAlign: "center" }}>Find your classes!</h2>
          <Tag color="purple" style={{ marginBottom: "2em" }}>
            Added classes {userCourses.length}
          </Tag>
          <Search
            placeholder="Enter your class number"
            onChange={e => this.setState({ classNumber: e.target.value })}
            onSearch={this.onSearch}
            enterButton
          />
        </Form>
        {courses ? (
          <ClassList
            courses={courses}
            addCourse={this.addCourse}
            removeCourse={this.removeCourse}
            userCourses={userCourses}
            loading={loading}
          />
        ) : null}

        <Space
          size="small"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4em"
          }}
        >
          <Button
            type="primary"
            disabled={currentStep === 0}
            onClick={onBackButton}
          >
            Back
          </Button>
          <Button type="primary" onClick={this.onSubmit}>
            Finish and start 学习帮
          </Button>
        </Space>
      </div>
    );
  }
}

export default ClassesForm;
