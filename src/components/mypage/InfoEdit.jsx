import React, { Component } from "react";
import {
  UserOutlined,
  RocketOutlined,
  NodeIndexOutlined
} from "@ant-design/icons";
import { Space, Select, Input } from "antd";
import { getUniversities } from "../../services/universityService";
import { getMajors } from "../../services/majorService";

const { Option } = Select;

class InfoEdit extends Component {
  state = {
    schoolOptions: [],
    majorOptions: []
  };

  componentDidMount = async () => {
    const { data: schoolOptions } = await getUniversities();
    const { data: majorOptions } = await getMajors();

    this.setState({
      schoolOptions,
      majorOptions
    });
  };

  render() {
    const { user, onChange, onValue } = this.props;
    const { schoolOptions, majorOptions } = this.state;
    return (
      <>
        <p>
          <Space>
            <UserOutlined />
            <Input
              style={{ width: 250 }}
              value={user.userName}
              name="userName"
              onChange={onChange}
            />
          </Space>
        </p>
        <p>
          <Space>
            <RocketOutlined />
            <Select
              name="university"
              showSearch
              defaultValue={user.university}
              // value={university}
              style={{ width: 250, textAlign: "left" }}
              placeholder="Select university"
              optionFilterProp="children"
              onChange={value => {
                onValue("university", value);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {schoolOptions.map(x => (
                <Option value={x._id} key={x._id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </Space>
        </p>
        <p>
          <Space>
            <NodeIndexOutlined />
            <Select
              name="major"
              showSearch
              defaultValue={user.major}
              // value={university}
              style={{ width: 250, textAlign: "left" }}
              placeholder="Select university"
              optionFilterProp="children"
              onChange={value => {
                onValue("major", value);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {majorOptions.map(x => (
                <Option value={x._id} key={x._id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </Space>
        </p>
      </>
    );
  }
}

export default InfoEdit;
