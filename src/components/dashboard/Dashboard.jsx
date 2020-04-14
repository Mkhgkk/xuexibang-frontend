import React, { Component } from "react";
import { Layout } from "antd";
import CardBox from "./CardBox";
import SideBar from "../SideBar";
import { Route } from "react-router-dom";
import Classes from "./Classes";
import Homework from "./Homework";

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
            paddingLeft: "15%",
          }}
        >
          <Route path="/dashboard/feeds" component={CardBox} />
          <Route path="/dashboard/classes" component={Classes} />
          <Route path="/dashboard/homework" component={Homework} />
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
