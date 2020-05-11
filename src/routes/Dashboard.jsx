import React, { Component } from "react";
import { Layout } from "antd";
import CardBox from "../components/dashboard/CardBox";
import SideBar from "../components/SideBar";
import { Route, Switch } from "react-router-dom";
import Classes from "../components/dashboard/Classes";
import Homework from "../components/dashboard/Homework";
import Announcements from "../components/dashboard/Announcements";
import ClassDetails from "../components/dashboard/ClassDetails";
import AdminClass from "./AdminClass";
import CreateClass from "./CreateClass";

class Dashboard extends Component {
  render() {
    const { Content } = Layout;
    return (
      <Layout>
        <SideBar {...this.props} />
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "97vh",
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
