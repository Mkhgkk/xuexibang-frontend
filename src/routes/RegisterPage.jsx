import React, { Component } from "react";
import { Layout } from "antd";
import RegisterForm from "../components/register/RegisterForm";
import photo from "../image/register.svg";
import UserContext from "../context/userContext";
import { Redirect } from "react-router-dom";

const { Content } = Layout;

class RegisterPage extends Component {
  static contextType = UserContext;

  render() {
    const { currentUser } = this.context;
    if (currentUser) return <Redirect to="/dashboard/feeds" />;

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
            <RegisterForm />
            <img src={photo} alt="login" style={{ width: "28%" }} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default RegisterPage;
