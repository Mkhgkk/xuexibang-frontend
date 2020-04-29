import React, { Component } from "react";
import Class from "./ClassCard";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import ClassList from "../information/ClassList";

const { Search } = Input;

class Classes extends Component {
  state = {
    keys: [1, 2, 3, 4, 5],
    editMode: false,
    classNumber: ""
  };

  handleEdit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleDelete = () => {
    console.log("handleDelete");
  };

  render() {
    const { editMode } = this.state;

    return (
      <React.Fragment>
        <Button
          onClick={this.handleEdit}
          style={{ position: "absolute", right: 20 }}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
        <h1 style={{ textAlign: "center", marginBottom: "2em" }}>My Classes</h1>

        {editMode && (
          <div style={{ marginBottom: "2em" }}>
            <Form
              style={{
                width: 400,
                margin: "0 auto",
                marginBottom: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <p style={{ textAlign: "center", fontWeight: 500 }}>
                Add new class
              </p>

              <Search
                placeholder="Enter your class number"
                onSearch={value => this.setState({ classNumber: value })}
                enterButton
              />
            </Form>
            {this.state.classNumber && <ClassList />}
          </div>
        )}
        <Row gutter={[32, 24]}>
          {this.state.keys.map(v => (
            <Col span={6}>
              <Link to={`/dashboard/classes/${v.key}`}>
                <Class
                  key={v.key}
                  editMode={editMode}
                  onDelete={this.handleDelete}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Classes;
