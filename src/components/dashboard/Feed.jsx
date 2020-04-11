import React, { Component } from "react";
import { Layout } from "antd";
import CardBox from "./CardBox";

class Feed extends Component {
  render() {
    const { Content } = Layout;
    return (
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "89vh",
            paddingBottom: "16px",
            paddingTop: "9vh",
            paddingLeft: "15%"
          }}
        >
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
        </Content>
      </Layout>
    );
  }
}

export default Feed;
