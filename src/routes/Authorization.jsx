import React from "react";
import { Result, Button, Layout } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const Authorization = props => {
  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px 0",
          minHeight: "100vh",
          paddingBottom: "16px",
          paddingTop: "9vh"
        }}
      >
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to="/dashboard/feeds">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Content>
    </Layout>
  );
};

export default Authorization;
