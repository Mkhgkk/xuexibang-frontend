import React, { Component } from "react";
import { Layout, Menu, Avatar, Modal } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FrownTwoTone, UserOutlined } from "@ant-design/icons";
import authService from "../services/authService";
import UserContext from "../context/userContext";
import logo from "../image/logo.png";

const { confirm } = Modal;
const { Header } = Layout;

class NavBar extends Component {
  showConfirm = () => {
    confirm({
      title: "Do you want to logout 学习帮?",
      icon: <FrownTwoTone twoToneColor="#722ed1" />,
      okText: "Logout",
      onOk() {
        authService.logout();
        window.location.replace("/login");
      },
      onCancel() {}
    });
  };

  render() {
    return (
      <UserContext.Consumer>
        {value => (
          <Layout className="layout">
            <Header
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                position: "fixed",
                width: "100%",
                zIndex: "1",
                boxShadow: "0 1px 1px #f0f0f0"
              }}
            >
              <div className="logo">
                <Link to="/dashboard/feeds">
                  <img src={logo} style={{ width: 70 }} alt="logo" />
                </Link>
              </div>

              {value.auth ? (
                <Menu theme="light" mode="horizontal">
                  <NavLink
                    to="/mypage"
                    style={{ color: "#595959", marginRight: "2em" }}
                  >
                    <Avatar
                      style={{
                        marginRight: "0.5em",
                        backgroundColor: "#9254de"
                      }}
                      src={value.currentUser && value.currentUser.avatar}
                      icon={<UserOutlined />}
                    />
                    <span>
                      {value.currentUser && value.currentUser.userName}
                    </span>
                  </NavLink>

                  <span
                    onClick={this.showConfirm}
                    style={{ marginRight: "2em" }}
                    className="cursor"
                  >
                    Sign out
                  </span>
                </Menu>
              ) : (
                <Menu theme="light" mode="horizontal">
                  <Menu.Item>
                    <NavLink to="/login">Login</NavLink>
                  </Menu.Item>
                  <Menu.Item>
                    <NavLink to="/register">Register</NavLink>
                  </Menu.Item>
                </Menu>
              )}
            </Header>
          </Layout>
        )}
      </UserContext.Consumer>
    );
  }
}

export default NavBar;
