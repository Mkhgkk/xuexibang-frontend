import React, { Component } from "react";
import { Layout, Menu, Avatar, Modal } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FrownTwoTone } from "@ant-design/icons";
import auth from "../services/authService";
import { getUserDetail } from "../services/userService";

const { confirm } = Modal;
const { Header } = Layout;

class NavBar extends Component {
  state = {
    user: {}
  };

  componentDidMount = async () => {
    const { data: user } = await getUserDetail();
    this.setState({ user });
    console.log(this.state.user);
  };

  showConfirm = () => {
    confirm({
      title: "Do you want to logout 学习帮?",
      icon: <FrownTwoTone twoToneColor="#722ed1" />,
      okText: "Logout",
      onOk() {
        auth.logout();
        window.location.replace("/login");
      },
      onCancel() {}
    });
  };

  render() {
    const { auth } = this.props;
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

          {auth ? (
            <Menu theme="light" mode="horizontal">
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
    );
  }
}

export default NavBar;
