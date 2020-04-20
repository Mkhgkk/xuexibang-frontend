import React, { Component } from "react";
import { Layout, Menu, Avatar, Modal, Button } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FrownTwoTone } from "@ant-design/icons";

const { confirm } = Modal;

class NavBar extends Component {
  showConfirm = () => {
    confirm({
      title: "Do you want to logout 学习帮?",
      icon: <FrownTwoTone twoToneColor="#722ed1" />,
      okText: "Logout",
      onOk() {
        //remove token
        window.location.replace("/login");
      },
      onCancel() {}
    });
  };
  render() {
    const { Header } = Layout;

    return (
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            position: "fixed",
            width: "100%",
            zIndex: "1"
          }}
        >
          <div className="logo">
            <Link to="/">作业帮</Link>
          </div>
          <Menu theme="light" mode="horizontal">
            <Menu.Item>
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/register">Register</NavLink>
            </Menu.Item>

            <NavLink
              to="/mypage"
              style={{ color: "#595959", marginRight: "2em" }}
            >
              <Avatar
                style={{ marginRight: "0.5em" }}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span>Username</span>
            </NavLink>

            <span
              onClick={this.showConfirm}
              style={{ marginRight: "2em" }}
              className="cursor"
            >
              Sign out
            </span>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default NavBar;
