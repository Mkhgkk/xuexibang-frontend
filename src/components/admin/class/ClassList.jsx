import React, { Component } from "react";
import ClassCard from "./ClassCard";

class ClassList extends Component {
  render() {
    return (
      <div style={{ overflow: "scroll", height: "80vh" }}>
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    );
  }
}

export default ClassList;
