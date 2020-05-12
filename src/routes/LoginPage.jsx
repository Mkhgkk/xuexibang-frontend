import React, { Component } from "react";
import { Layout } from "antd";
import LoginForm from "../components/Login/LoginForm";
import photo from "../image/login.svg";
import UserContext from "../context/userContext";
import { Redirect } from "react-router-dom";

const { Content } = Layout;

class LoginPage extends Component {
  static contextType = UserContext;
  render() {
    const { auth } = this.context;
    if (auth) return <Redirect to="/dashboard/feeds" />;

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
            <img
              src={photo}
              alt="login"
              style={{ width: "30%", marginRight: "2em" }}
            />
            <LoginForm />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default LoginPage;
