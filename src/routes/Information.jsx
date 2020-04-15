import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Layout, Steps, Space } from "antd";
import ProfileForm from "../components/information/ProfileForm";
import SchoolForm from "../components/information/SchoolForm";
import ClassesForm from "../components/information/ClassesForm";

class Information extends Component {
  state = {
    currentStep: 0
  };

  onStepsChange = currentStep => {
    this.setState({ currentStep });
  };

  onNextButton = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  onBackButton = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  render() {
    const { Content } = Layout;
    const { Step } = Steps;
    const { currentStep } = this.state;

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
          <div
            style={{
              width: "60%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "2em"
            }}
          >
            <h1 style={{ marginBottom: "2em" }}>
              Start with submitting your information
            </h1>
            <Steps
              current={currentStep}
              onChange={this.onStepsChange}
              style={{
                textAlign: "left",
                width: "80%"
              }}
            >
              <Step
                title="Profile"
                description="Set your personal information."
              />
              <Step title="School" description="Find your school and major." />
              <Step title="Classes" description="Save your classes." />
            </Steps>
            {currentStep === 0 && <ProfileForm />}
            {currentStep === 1 && <SchoolForm />}
            {currentStep === 2 && <ClassesForm />}

            <Space size="small">
              <Button
                type="primary"
                disabled={currentStep === 0}
                onClick={this.onBackButton}
              >
                Back
              </Button>
              {currentStep !== 2 ? (
                <Button
                  type="primary"
                  onClick={this.onNextButton}
                  disabled={currentStep === 2}
                >
                  Next
                </Button>
              ) : (
                <Button type="primary" danger>
                  Submit
                </Button>
              )}
            </Space>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Information;
