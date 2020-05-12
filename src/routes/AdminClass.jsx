import React, { Component } from "react";
import { Row, Col } from "antd";
import ClassList from "../components/admin/class/ClassList";
import ClassDetail from "../components/admin/class/ClassDetail";
import { Route } from "react-router-dom";
import UserContext from "../context/userContext";

class AdminClass extends Component {
  static contextType = UserContext;
  render() {
    const { currentUser } = this.context;

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
              auth={currentUser}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminClass;
