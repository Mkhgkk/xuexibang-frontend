import React, { Component } from "react";
import { Card, Button, message } from "antd";
import BasicInfo from "./BasicInfo";
import Homework from "./Homework";
import New from "./New";
import Edit from "./Edit";
import { PlusOutlined } from "@ant-design/icons";
import * as courseService from "../../../services/courseService";
import { getCurrentUser } from "../../../services/authService";
import * as feedService from "../../../services/feedService";
import moment from "moment";

const tabList = [
  {
    key: "tab1",
    tab: "Basic Info",
  },
  {
    key: "tab2",
    tab: "Announcement",
  },
  {
    key: "tab3",
    tab: "Homework",
  },
];

class ClassDetail extends Component {
  state = {
    key: "tab1",
    noTitleKey: "app",
    newModal: false,
    newMode: "",
    infoEditMode: false,
    course: {},
    auth: {},
    announcement: [],
    homework: [],
    new: { content: "", deadline: "" },
    viewEdit: false,
    feed: {},
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const { data: course } = await courseService.getCourse(id);
    const { data: announcement } = await feedService.getAnnouncementById(id);
    const { data: homework } = await feedService.getHomeworkById(id);
    const auth = getCurrentUser();
    this.setState({ course, auth, announcement, homework });
  };

  componentDidUpdate = async () => {
    if (this.state.course._id !== this.props.match.params.id) {
      const id = this.props.match.params.id;
      const { data: course } = await courseService.getCourse(id);
      const { data: announcement } = await feedService.getAnnouncementById(id);
      const { data: homework } = await feedService.getHomeworkById(id);
      this.setState({
        course,
        announcement,
        homework,
        key: "tab1",
        infoEditMode: false,
      });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const course = { ...this.state.course };
    course[input.name] = input.value;
    this.setState({ course });
  };

  handleSubmit = async (e) => {
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

  onMakeNew = (mode) => {
    this.setState({ newMode: mode });
  };

  showDrawer = () => {
    this.setState({
      newModal: true,
    });
  };

  onClose = () => {
    this.setState({
      newModal: false,
    });
  };

  handleEdit = () => {
    this.setState({
      infoEditMode: !this.state.infoEditMode,
    });
  };

  onSubmitAnnounce = async (e) => {
    e.preventDefault();
    const { course } = this.state;

    const feed = {
      type: "announcement",
      course: course._id,
      content: this.state.new.content,
    };
    try {
      await feedService.newFeed(feed);
      const { data: announcement } = await feedService.getAnnouncementById(
        course._id
      );
      this.setState({ announcement, new: {} });
      message.success(`New announcement has been posted.`);
      this.onClose();
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  onSubmitHomework = async (e) => {
    e.preventDefault();
    const { course } = this.state;

    if (moment.isMoment(this.state.new.deadline) && this.state.new.content) {
      const feed = {
        type: "homework",
        course: course._id,
        content: this.state.new.content,
        deadline: this.state.new.deadline.toJSON(),
      };
      try {
        await feedService.newFeed(feed);
        const { data: homework } = await feedService.getHomeworkById(
          course._id
        );
        message.success(`New homework has been posted.`);
        this.onClose();
        this.setState({ homework, new: {} });
      } catch (ex) {
        if (ex.response && ex.response.status === 400)
          message.error(ex.response.data);
      }
    } else if (!moment.isMoment(this.state.new.deadline)) {
      message.error("Please select deadline");
    } else {
      message.error("Please fill the form compeletly");
    }
  };

  onNewChange = (name, value) => {
    const newFeed = { ...this.state.new };
    newFeed[name] = value;
    this.setState({ new: newFeed });
  };

  onSaveAnnounce = async (e) => {
    e.preventDefault();
    const { feed, course } = this.state;

    try {
      await feedService.saveFeed({ content: feed.content, _id: feed._id });
      const { data: announcement } = await feedService.getAnnouncementById(
        course._id
      );
      message.success(`Announcement has been changed.`);
      this.onCloseEdit();
      this.setState({ feed: {}, announcement });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  onSaveHomework = async (e) => {
    e.preventDefault();
    const { feed, course } = this.state;

    const payload = moment.isMoment(feed.deadline)
      ? {
          content: feed.content,
          deadline: feed.deadline.toJSON(),
          _id: feed._id,
        }
      : { content: feed.content, deadline: feed.deadline, _id: feed._id };

    try {
      await feedService.saveFeed(payload);
      const { data: homework } = await feedService.getHomeworkById(course._id);
      message.success(`Homework has been changed.`);
      this.onCloseEdit();
      this.setState({ feed: {}, homework });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  onChangeEdit = (name, value) => {
    const feed = { ...this.state.feed };
    feed[name] = value;
    this.setState({ feed });
  };

  onOpenEdit = (feed) => {
    this.setState({ viewEdit: true, feed });
  };

  onCloseEdit = () => {
    this.setState({
      viewEdit: false,
      feed: {},
    });
  };

  onDeleteAnnounce = async (id) => {
    const originalAnnouncement = this.state.announcement;

    const announcement = originalAnnouncement.filter((a) => a._id !== id);
    this.setState({ announcement });

    try {
      await feedService.deleteFeed(id);
      message.success("Announcement has been deleted.");
      this.onCloseEdit();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        message.error("This announcement has already been deleted.");

      this.setState({ announcement: originalAnnouncement });
    }
  };

  onDeleteHomework = async (id) => {
    const originalHomework = this.state.homework;

    const homework = originalHomework.filter((a) => a._id !== id);
    this.setState({ homework });

    try {
      await feedService.deleteFeed(id);
      message.success("Homework has been deleted.");
      this.onCloseEdit();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        message.error("This homework has already been deleted.");

      this.setState({ homework: originalHomework });
    }
  };

  render() {
    const {
      key,
      newModal,
      infoEditMode,
      newMode,
      course,
      auth,
      announcement,
      homework,
      feed,
      viewEdit,
    } = this.state;
    const contentList = {
      tab1: (
        <BasicInfo
          editMode={infoEditMode}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          course={course}
        />
      ),
      tab2: (
        <Homework
          courseId={course._id}
          auth={auth}
          type="Announcement"
          listData={announcement}
          onOpenEdit={this.onOpenEdit}
        />
      ),
      tab3: (
        <Homework
          courseId={course._id}
          auth={auth}
          type="Homework"
          listData={homework}
          onOpenEdit={this.onOpenEdit}
        />
      ),
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
          onTabChange={(key) => {
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
          onSubmitAnnounce={this.onSubmitAnnounce}
          onSubmitHomework={this.onSubmitHomework}
          onChange={this.onNewChange}
          new={this.state.new}
        />
        <Edit
          visible={viewEdit}
          onClose={this.onCloseEdit}
          data={feed}
          onChange={this.onChangeEdit}
          onSubmitAnnounce={this.onSaveAnnounce}
          onSubmitHomework={this.onSaveHomework}
          onDeleteAnnounce={this.onDeleteAnnounce}
          onDeleteHomework={this.onDeleteHomework}
        />
      </div>
    );
  }
}

export default ClassDetail;
