import React, { Component } from "react";
import { Row, Col } from "antd";
import ClassList from "../components/admin/class/ClassList";
import ClassDetail from "../components/admin/class/ClassDetail";
import { Route } from "react-router-dom";

class AdminClass extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2 style={{ marginBottom: "1em" }}>List of classes I manage</h2>
        <Row>
          <Col span={6}>
            <ClassList />
          </Col>
          <Col span={17} style={{ paddingLeft: "2em" }}>
            <Route
              path="/dashboard/admin/classes/:id"
              component={ClassDetail}
              auth={auth}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminClass;
