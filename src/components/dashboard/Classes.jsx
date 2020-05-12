import React, { Component } from "react";
import Class from "./ClassCard";
import { Row, Col, Form, Input, Button, message, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import ClassList from "../information/ClassList";
import { getMyCourses, getSearchedCourse } from "../../services/courseService";
import * as userSerivce from "../../services/userService";
import HomeworkLoading from "./HomeworkLoading";

const { Search } = Input;

class Classes extends Component {
  state = {
    editMode: false,
    classNumber: "",
    myCourses: [],
    userCoursesId: [],
    courses: null,
    loading: false,
    fetchLoading: false
  };

  componentDidMount = async () => {
    this.setState({ fetchLoading: true });
    try {
      const { data: user } = await userSerivce.getUserDetail();
      const { data: myCourses } = await getMyCourses();
      this.setState({
        myCourses,
        userCoursesId: user.courses,
        fetchLoading: false
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleEdit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  addCourse = async courseId => {
    const userCoursesId = [courseId, ...this.state.userCoursesId];
    this.setState({ userCoursesId, loading: true });
    try {
      await userSerivce.changeUserInfo({ courses: userCoursesId });
      const { data: myCourses } = await getMyCourses();
      this.setState({ myCourses, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
      this.setState({ loading: false });
    }
  };

  removeCourse = async courseId => {
    let userCoursesId = [...this.state.userCoursesId];
    userCoursesId = userCoursesId.filter(x => x !== courseId);
    this.setState({ userCoursesId, loading: true });
    try {
      await userSerivce.changeUserInfo({ courses: userCoursesId });
      const { data: myCourses } = await getMyCourses();
      this.setState({ myCourses, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
      this.setState({ loading: false });
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
    const {
      editMode,
      myCourses,
      courses,
      userCoursesId,
      loading,
      fetchLoading
    } = this.state;

    return (
      <React.Fragment>
        <Button
          onClick={this.handleEdit}
          style={{ position: "absolute", right: 20 }}
        >
          {editMode ? "Save" : "Add courses"}
        </Button>
        <h1 style={{ textAlign: "center", marginBottom: "2em" }}>My Classes</h1>
        {fetchLoading ? (
          <HomeworkLoading />
        ) : (
          editMode && (
            <div style={{ marginBottom: "2em" }}>
              <Form
                style={{
                  width: 400,
                  margin: "0 auto",
                  marginBottom: "2em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <p style={{ textAlign: "center", fontWeight: 500 }}>
                  Add new class
                </p>

                <Search
                  placeholder="Enter your class number"
                  onChange={e => this.setState({ classNumber: e.target.value })}
                  onSearch={this.onSearch}
                  enterButton
                />
              </Form>

              {courses && (
                <ClassList
                  addCourse={this.addCourse}
                  courses={courses}
                  userCourses={userCoursesId}
                  removeCourse={this.removeCourse}
                />
              )}
            </div>
          )
        )}
        {myCourses.length === 0 && (
          <Empty description="No class" style={{ marginTop: "10%" }} />
        )}
        <Spin spinning={loading}>
          <Row gutter={[32, 24]}>
            {myCourses.map(v => (
              <Col span={6} key={v._id}>
                <Link to={`/dashboard/classes/${v._id}`}>
                  <Class course={v} />
                </Link>
              </Col>
            ))}
          </Row>
        </Spin>
      </React.Fragment>
    );
  }
}

export default Classes;
