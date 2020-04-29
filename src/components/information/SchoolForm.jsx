import React, { Component } from "react";
import { Form, Space, Button, Select, message } from "antd";
import { getUniversities } from "../../services/universityService";
import { getMajors } from "../../services/majorService";
import * as userSerivce from "../../services/userService";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

class SchoolForm extends Component {
  state = {
    schoolOptions: [],
    majorOptions: [],
    university: "",
    major: "",
    ready: false
  };

  componentDidMount = async () => {
    const { data: user } = await userSerivce.getUserDetail();

    const { data: schoolOptions } = await getUniversities();
    const { data: majorOptions } = await getMajors();

    this.setState({
      schoolOptions,
      majorOptions,
      university: user.university,
      major: user.major,
      ready: true
    });
  };

  handleSubmit = async () => {
    const { university, major } = this.state;
    try {
      await userSerivce.changeUserInfo({ university, major });
      if (university && major) this.props.onNextButton();
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  render() {
    const { currentStep, onBackButton } = this.props;
    const {
      schoolOptions,
      majorOptions,
      university,
      major,
      ready
    } = this.state;

    return (
      <>
        {ready && (
          <Form
            style={{
              paddingTop: "5em",
              paddingBottom: "3em"
            }}
            {...layout}
          >
            <Form.Item
              name="university"
              label="University"
              rules={[
                { required: true, message: "Please input your university!" }
              ]}
            >
              <Select
                name="university"
                showSearch
                defaultValue={university}
                value={university}
                style={{ width: 300, textAlign: "left" }}
                placeholder="Select university"
                optionFilterProp="children"
                onChange={value => this.setState({ university: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {schoolOptions.map(x => (
                  <Option value={x._id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="major"
              label="Major"
              rules={[{ required: true, message: "Please input your major" }]}
            >
              <Select
                name="major"
                showSearch
                defaultValue={major}
                value={major}
                style={{ width: 300, textAlign: "left" }}
                placeholder="Select major"
                optionFilterProp="children"
                onChange={value => this.setState({ major: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {majorOptions.map(x => (
                  <Option value={x._id}>{x.name}</Option>
                ))}
              </Select>
            </Form.Item>

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
              <Button
                type="primary"
                onClick={this.handleSubmit}
                htmlType="submit"
              >
                Next
              </Button>
            </Space>
          </Form>
        )}
      </>
    );
  }
}

export default SchoolForm;
