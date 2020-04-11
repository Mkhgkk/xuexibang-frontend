import React, { Component } from "react";
import { Layout } from "antd";
import LoginForm from "../components/Login/LoginForm";

class LoginPage extends Component {
  render() {
    const { Content } = Layout;
    return (
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "100vh",
            paddingBottom: "16px",
            paddingTop: "9vh"
          }}
        >
          <LoginForm />
        </Content>
      </Layout>
    );
  }
}

export default LoginPage;
