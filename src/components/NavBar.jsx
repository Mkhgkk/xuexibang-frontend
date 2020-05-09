import React, { Component } from "react";
import { Layout, Menu, Avatar, Modal } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FrownTwoTone, UserOutlined } from "@ant-design/icons";
import authService from "../services/authService";
import { getUserDetail } from "../services/userService";
import UserContext from "../context/userContext";

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
      onCancel() {},
    });
  };

  render() {
    const { auth } = this.props;

    return (
      <UserContext.Consumer>
        {(value) => (
          <Layout className="layout">
            <Header
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                position: "fixed",
                width: "100%",
                zIndex: "1",
              }}
            >
              <div className="logo">
                <Link to="/">作业帮</Link>
              </div>

              {auth ? (
                <Menu theme="light" mode="horizontal">
                  <NavLink
                    to="/mypage"
                    style={{ color: "#595959", marginRight: "2em" }}
                  >
                    {value.currentUser.avatar ? (
                      <Avatar
                        style={{ marginRight: "0.5em" }}
                        src={value.currentUser.avatar}
                      />
                    ) : (
                      <Avatar
                        style={{
                          marginRight: "0.5em",
                          backgroundColor: "#9254de",
                        }}
                        icon={<UserOutlined />}
                      />
                    )}
                    <span>{value.currentUser.userName}</span>
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
