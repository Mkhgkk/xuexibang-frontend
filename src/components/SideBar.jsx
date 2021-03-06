import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  render() {
    return (
      <Sider
        theme="light"
        style={{
          minHeight: "100vh",
          position: "relative",
          top: "8vh",
          position: "fixed",
          paddingTop: "1em"
        }}
      >
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <NavLink to="/">
              {" "}
              <PieChartOutlined />
              <span>Feed</span>
            </NavLink>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <DesktopOutlined />
                <span>My study room</span>
              </span>
            }
          >
            <Menu.Item key="2">My classes</Menu.Item>
            <Menu.Item key="3">Annoucement</Menu.Item>
            <Menu.Item key="4">Homework</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
