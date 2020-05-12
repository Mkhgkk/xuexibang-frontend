import React, { Component } from "react";
import ClassForm from "../components/admin/createClass/ClassForm";

class CreateClass extends Component {
  render() {
    return (
      <div style={{ height: "85vh" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1em" }}>
          Create new class
        </h2>
        <ClassForm history={this.props.history} />
      </div>
    );
  }
}

export default CreateClass;
