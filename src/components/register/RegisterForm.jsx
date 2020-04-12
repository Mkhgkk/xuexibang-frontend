import React, { Component } from "react";
import { Form, Input, Tooltip, Button, Checkbox } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

class RegisterForm extends Component {
  render() {
    console.log(this.props);
    const onFinish = values => {
      console.log("Success:", values);
      this.props.showEmailSent();
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Form
        name="register"
        scrollToFirstError
        style={{ width: "30%", paddingRight: "3em" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <p style={{ marginBottom: "1.5em", fontSize: "1.2em" }}>
          Register for 学习帮
        </p>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="nickname"
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement")
            }
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginBottom: "0.8em " }}
        >
          Register
        </Button>
        Already have account? <Link to="/login">Login now!</Link>
      </Form>
    );
  }
}

export default RegisterForm;
