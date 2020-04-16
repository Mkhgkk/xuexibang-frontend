import React, { Component } from "react";
import { Card, Button } from "antd";
import BasicInfo from "./BasicInfo";
import Notification from "./Notification";
import Homework from "./Homework";
import New from "./New";
import { PlusOutlined } from "@ant-design/icons";

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
    infoEditMode: false
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
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
    const { key, newModal, infoEditMode } = this.state;
    const contentList = {
      tab1: <BasicInfo editMode={infoEditMode} handleEdit={this.handleEdit} />,
      tab2: <Notification />,
      tab3: <Homework />
    };
    return (
      <div>
        <Card
          style={{ width: "100%" }}
          title="线性代数"
          extra={
            key === "tab1" ? (
              <Button onClick={this.handleEdit}>
                {" "}
                {infoEditMode ? "Cancel" : "Edit"}
              </Button>
            ) : key === "tab2" ? (
              <Button type="primary" onClick={this.showDrawer}>
                <PlusOutlined />
                New Announcement
              </Button>
            ) : (
              <Button type="primary">
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
        <New visible={newModal} onClose={this.onClose} />
      </div>
    );
  }
}

export default ClassDetail;
