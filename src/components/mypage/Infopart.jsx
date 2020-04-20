import React, { Component } from "react";

import {
  MailOutlined,
  UserOutlined,
  RocketOutlined,
  NodeIndexOutlined
} from "@ant-design/icons";
import { Space } from "antd";

class Infopart extends Component {
  render() {
    const { editMode, userData, onChange } = this.props;
    return (
      <div style={{ paddingRight: "2em" }}>
        <p>
          <Space>
            <MailOutlined />
            {userData.email}
          </Space>
        </p>
        <p>
          <Space>
            <UserOutlined />
            {editMode ? (
              <input
                className="mypageInput"
                value={userData.userName}
                name="userName"
                onChange={onChange}
              />
            ) : (
              userData.userName
            )}
          </Space>
        </p>
        <p>
          <Space>
            <RocketOutlined />
            {editMode ? (
              <input
                className="mypageInput"
                value={userData.university}
                name="university"
                onChange={this.handleChange}
              />
            ) : (
              userData.university
            )}
          </Space>
        </p>
        <p>
          <Space>
            <NodeIndexOutlined />
            {editMode ? (
              <input
                className="mypageInput"
                value={userData.major}
                name="major"
                onChange={this.handleChange}
              />
            ) : (
              userData.major
            )}
          </Space>
        </p>
      </div>
    );
  }
}

export default Infopart;
