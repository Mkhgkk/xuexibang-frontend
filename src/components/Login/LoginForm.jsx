import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import photo from "../../image/login.svg";

class LoginForm extends Component {
  render() {
    return (
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          width: "100%",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          src={photo}
          alt="login"
          style={{ width: "30%", marginRight: "2em" }}
        />
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          style={{ width: "25%" }}
          //   onFinish={onFinish}
        >
          <p style={{ marginBottom: "1.5em", fontSize: "1.2em" }}>
            Login and start 学习帮
          </p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", marginBottom: "0.8em " }}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
