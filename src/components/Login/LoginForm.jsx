import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import auth from "../../services/authService";

class LoginForm extends Component {
  onSubmit = async values => {
    try {
      await auth.login(values.email, values.password);
      window.location = "/dashboard/feeds";
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
        name="normal_login"
        initialValues={{ remember: true }}
        style={{ width: "25%", textAlign: "center" }}
        onFinish={this.onSubmit}
        onFinishFailed={this.onFinishFailed}
      >
        <p
          style={{
            marginBottom: "1.5em",
            fontSize: "1.2em",
            textAlign: "center"
          }}
        >
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
            onSubmit={this.onSubmit}
            className="login-form-button"
            style={{ width: "100%", marginBottom: "0.8em " }}
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
