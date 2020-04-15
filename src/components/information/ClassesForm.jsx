import React, { Component } from "react";
import { Space, Button, Input, Form, Tag } from "antd";
import ClassDrawer from "./ClassDrawer";

const { Search } = Input;

class ClassesForm extends Component {
  state = {
    classNumber: ""
  };

  handleSubmit = () => {
    console.log("handleSubmit");
  };

  render() {
    const { classNumber } = this.state;
    const { currentStep, onBackButton } = this.props;

    return (
      <div style={{ marginBottom: "5em" }}>
        <Form
          style={{
            width: 400,
            marginTop: "3em",
            marginBottom: "2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h2 style={{ textAlign: "center" }}>Find your classes!</h2>
          <Tag color="purple" style={{ marginBottom: "2em" }}>
            Added classes 0
          </Tag>
          <Search
            placeholder="Enter your class number"
            onSearch={value => this.setState({ classNumber: value })}
            enterButton
          />
        </Form>
        {classNumber && <ClassDrawer classNumber={classNumber} />}

        <Space
          size="small"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4em"
          }}
        >
          <Button
            type="primary"
            disabled={currentStep === 0}
            onClick={onBackButton}
          >
            Back
          </Button>
          <Button type="primary" onClick={this.handleSubmit}>
            Finish and start 学习帮
          </Button>
        </Space>
      </div>
    );
  }
}

export default ClassesForm;
