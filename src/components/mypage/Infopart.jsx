import React, { Component } from "react";
import {
  MailOutlined,
  UserOutlined,
  RocketOutlined,
  NodeIndexOutlined
} from "@ant-design/icons";
import { Space } from "antd";
import { getUniversity } from "../../services/universityService";
import { getMajor } from "../../services/majorService";

class Infopart extends Component {
  state = {
    university: "",
    major: ""
  };

  componentDidMount = async () => {
    const { user } = this.props;
    const { data: university } = await getUniversity(user.university);
    const { data: major } = await getMajor(user.major);

    this.setState({ university: university.name, major: major.name });
  };

  render() {
    const { editMode, user, onChange } = this.props;
    const { university, major } = this.state;
    return (
      <div style={{ paddingRight: "2em" }}>
        <p>
          <Space>
            <MailOutlined />
            {user.email}
          </Space>
        </p>
        <p>
          <Space>
            <UserOutlined />
            {editMode ? (
              <input
                className="mypageInput"
                value={user.userName}
                name="userName"
                onChange={onChange}
              />
            ) : (
              user.userName
            )}
          </Space>
        </p>
        <p>
          <Space>
            <RocketOutlined />
            {editMode ? (
              <input
                className="mypageInput"
                value={user.university}
                name="university"
                onChange={this.handleChange}
              />
            ) : (
              university
            )}
          </Space>
        </p>
        <p>
          <Space>
            <NodeIndexOutlined />
            {editMode ? (
              <input
                className="mypageInput"
                value={user.major}
                name="major"
                onChange={this.handleChange}
              />
            ) : (
              major
            )}
          </Space>
        </p>
      </div>
    );
  }
}

export default Infopart;
