import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import * as userSerivce from "../../services/userService";
import auth from "../../services/authService";
import { Link, Redirect } from "react-router-dom";

class RegisterForm extends Component {
  onSubmit = async values => {
    try {
      const email = values.email;
      const password = values.password;

      const response = await userSerivce.register({ email, password });
      //auth.loginWithJwt(response.headers["x-auth-token"]);
      auth.loginWithJwt(response.data);
      console.log(response);
      window.location = "/userDetail";
      // this.props.showEmailSent();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        message.error(ex.response.data);
      }
    }
  };

  render() {
    // if (auth.getCurrentUser()) return <Redirect to="/dashboard/feeds" />;

    return (
      <Form
        name="register"
        scrollToFirstError
        style={{ width: "30%", paddingRight: "3em", textAlign: "center" }}
        onFinish={this.onSubmit}
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
