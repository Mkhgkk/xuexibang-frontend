import React, { Component } from "react";
import { Drawer } from "antd";
import StudentList from "./StudentList";

class ClassmateDrawer extends Component {
  state = {
    students: []
  };

  componentDidMount = () => {
    const students = [
      {
        name: "Han solo",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        manage: true
      },
      {
        name: "Han solo",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      },
      {
        name: "Han solo",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      }
    ];
    this.setState({ students });
  };

  render() {
    const { visible, onClose } = this.props;
    const { students } = this.state;
    return (
      <div>
        <Drawer
          title="Students in 线性代数"
          placement="right"
          onClose={onClose}
          visible={visible}
          placement="left"
          style={{ overflow: "scroll", height: "100vh" }}
        >
          {students.map(student => (
            <StudentList student={student} />
          ))}
        </Drawer>
      </div>
    );
  }
}

export default ClassmateDrawer;
