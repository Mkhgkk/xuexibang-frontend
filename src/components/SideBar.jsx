import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import UserContext from "../context/userContext";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  render() {
    const path = this.props.location.pathname;

    return (
      <UserContext.Consumer>
        {(value) => (
          <Sider
            theme="light"
            style={{
              minHeight: "100vh",
              position: "relative ",
              top: "8vh",
              position: "fixed",
              paddingTop: "1em",
            }}
          >
            <Menu
              theme="light"
              defaultSelectedKeys={path}
              defaultOpenKeys={
                path === "/dashboard/feeds"
                  ? null
                  : path === "/dashboard/admin/classes" ||
                    path === "/dashboard/admin/create"
                  ? ["admin"]
                  : ["studyRoom"]
              }
              mode="inline"
            >
              <Menu.Item key="/dashboard/feeds">
                <NavLink to="/dashboard/feeds">
                  <PieChartOutlined />
                  <span>Feed</span>
                </NavLink>
              </Menu.Item>

              <SubMenu
                key="studyRoom"
                title={
                  <span>
                    <DesktopOutlined />
                    <span>My study room</span>
                  </span>
                }
              >
                <Menu.Item key="/dashboard/classes">
                  <NavLink to="/dashboard/classes">
                    <span>My classes</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/dashboard/announcements">
                  <NavLink to="/dashboard/announcements">
                    <span>Announcements</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/dashboard/homework">
                  <NavLink to="/dashboard/homework">
                    <span>Homework</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              {value.currentUser && value.currentUser.isAdmin && (
                <SubMenu
                  key="admin"
                  title={
                    <span>
                      <SettingOutlined />
                      <span>Admin</span>
                    </span>
                  }
                >
                  <Menu.Item key="/dashboard/admin/classes">
                    <NavLink to="/dashboard/admin/classes">
                      <span>Classes</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/dashboard/admin/create">
                    <NavLink to="/dashboard/admin/create">
                      <span>Create Class</span>
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              )}
            </Menu>
          </Sider>
        )}
      </UserContext.Consumer>
    );
  }
}

export default SideBar;
