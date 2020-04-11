import React, { Component } from "react";
import { Layout } from "antd";
import RegisterForm from "../components/register/RegisterForm";

class RegisterPage extends Component {
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
          <RegisterForm />
        </Content>
      </Layout>
    );
  }
}

export default RegisterPage;
