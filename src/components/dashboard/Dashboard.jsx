import React, { Component } from "react";
import { Layout } from "antd";
import CardBox from "./CardBox";
import SideBar from "../SideBar";
import { Route, Switch } from "react-router-dom";
import Classes from "./Classes";
import Homework from "./Homework";
import Announcements from "./Announcements";
import ClassDetails from "./ClassDetails";
import AdminClass from "../../routes/AdminClass";
import CreateClass from "../../routes/CreateClass";

class Dashboard extends Component {
  render() {
    const { Content } = Layout;
    return (
      <Layout>
        <SideBar />
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "89vh",
            paddingBottom: "16px",
            paddingTop: "9vh",
            paddingLeft: "15%"
          }}
        >
          <Switch>
            <Route path="/dashboard/feeds" component={CardBox} />
            <Route path="/dashboard/classes/:id" component={ClassDetails} />
            <Route path="/dashboard/classes" component={Classes} />
            <Route path="/dashboard/announcements" component={Announcements} />
            <Route path="/dashboard/homework" component={Homework} />
            <Route path="/dashboard/admin/classes" component={AdminClass} />
            <Route path="/dashboard/admin/create" component={CreateClass} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
