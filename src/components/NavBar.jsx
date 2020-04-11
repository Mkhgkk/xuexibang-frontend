import React, { Component } from "react";
import { Layout, Menu, Avatar } from "antd";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
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
          <div className="logo">作业帮</div>
          <Menu theme="light" mode="horizontal">
            <Menu.Item>
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item>Register</Menu.Item>

            <Menu.Item>
              <Avatar
                style={{ marginRight: "0.5em" }}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span>Username</span>
            </Menu.Item>
            <Menu.Item>Sign out</Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default NavBar;
