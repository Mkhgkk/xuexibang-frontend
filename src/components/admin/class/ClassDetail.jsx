import React, { Component } from "react";
import { Card, Button, message } from "antd";

import BasicInfo from "./BasicInfo";
import Notification from "./Notification";
import Homework from "./Homework";
import New from "./New";
import { PlusOutlined } from "@ant-design/icons";
import * as courseService from "../../../services/courseService";

const tabList = [
  {
    key: "tab1",
    tab: "Basic Info"
  },
  {
    key: "tab2",
    tab: "Announcement"
  },
  {
    key: "tab3",
    tab: "Homework"
  }
];

class ClassDetail extends Component {
  state = {
    key: "tab1",
    noTitleKey: "app",
    newModal: false,
    newMode: "",
    infoEditMode: false,
    course: {}
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const { data: course } = await courseService.getCourse(id);
    this.setState({ course });
  };

  componentDidUpdate = async () => {
    if (this.state.course._id !== this.props.match.params.id) {
      const id = this.props.match.params.id;
      const { data: course } = await courseService.getCourse(id);
      this.setState({ course });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const course = { ...this.state.course };
    course[input.name] = input.value;
    this.setState({ course });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { course } = this.state;

    try {
      await courseService.saveCourse(course);
      this.handleEdit();
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  onMakeNew = mode => {
    this.setState({ newMode: mode });
  };

  showDrawer = () => {
    this.setState({
      newModal: true
    });
  };

  onClose = () => {
    this.setState({
      newModal: false
    });
  };

  handleEdit = () => {
    this.setState({
      infoEditMode: !this.state.infoEditMode
    });
  };

  render() {
    const { key, newModal, infoEditMode, newMode, course } = this.state;
    const contentList = {
      tab1: (
        <BasicInfo
          editMode={infoEditMode}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          course={course}
        />
      ),
      tab2: <Notification courseId={course._id} />,
      tab3: <Homework />
    };
    return (
      <div>
        <Card
          style={{ width: "100%" }}
          title={course.name}
          extra={
            key === "tab1" ? (
              <Button onClick={this.handleEdit}>
                {infoEditMode ? "Cancel" : "Edit"}
              </Button>
            ) : key === "tab2" ? (
              <Button
                type="primary"
                onClick={() => {
                  this.onMakeNew("Announcement");
                  this.showDrawer();
                }}
              >
                <PlusOutlined />
                New Announcement
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  this.onMakeNew("Homework");
                  this.showDrawer();
                }}
              >
                <PlusOutlined />
                New Homework
              </Button>
            )
          }
          tabList={tabList}
          activeTabKey={key}
          onTabChange={key => {
            this.onTabChange(key, "key");
          }}
        >
          {contentList[key]}
        </Card>
        <New
          visible={newModal}
          onClose={this.onClose}
          mode={newMode}
          course={course}
        />
      </div>
    );
  }
}

export default ClassDetail;
