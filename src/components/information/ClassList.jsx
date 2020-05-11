import React, { Component } from "react";
import { List, Avatar, Col, Spin, Tooltip, Empty } from "antd";
import { PlusCircleTwoTone, MinusCircleOutlined } from "@ant-design/icons";
import ClassDrawer from "./ClassDrawer";

class ClassList extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
    const {
      loading,
      courses,
      addCourse,
      removeCourse,
      userCourses
    } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Spin style={{ marginTop: "2em" }} />
        ) : (
          <>
            <List style={{ width: "400px" }} bordered>
              {courses.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No result for the number"
                />
              )}
              {courses &&
                courses.map(course => (
                  <>
                    <List.Item
                      style={{ backgroundColor: "white" }}
                      key={course._id}
                    >
                      <Col span={5}>
                        <Avatar size={50} src={course.thumbnail} />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center"
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            marginBottom: "0.5em",
                            fontWeight: 500,
                            fontSize: "1.2em"
                          }}
                        >
                          {course.name}
                        </p>
                        <p style={{ margin: 0 }}> {course.number}</p>
                      </Col>
                      <Col span={7}>
                        <a onClick={this.showDrawer}>View Class</a>
                        {!userCourses.includes(course._id) ? (
                          <Tooltip placement="rightTop" title={"Add class"}>
                            <PlusCircleTwoTone
                              twoToneColor="#722ed1"
                              style={{ fontSize: "1.2em", marginLeft: "0.5em" }}
                              onClick={() => {
                                addCourse(course._id);
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip placement="rightTop" title={"Delete class"}>
                            <MinusCircleOutlined
                              style={{ fontSize: "1.2em", marginLeft: "0.5em" }}
                              onClick={() => {
                                removeCourse(course._id);
                              }}
                            />
                          </Tooltip>
                        )}
                      </Col>
                    </List.Item>
                    <ClassDrawer
                      onClose={this.onClose}
                      visible={visible}
                      course={course}
                      addCourse={addCourse}
                      removeCourse={removeCourse}
                      added={userCourses.includes(course._id)}
                    />
                  </>
                ))}
            </List>
          </>
        )}
      </div>
    );
  }
}

export default ClassList;
