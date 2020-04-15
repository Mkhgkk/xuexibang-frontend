import React from "react";
import { Form, Space, Button, AutoComplete } from "antd";

function SchoolForm({ currentStep, onBackButton, onNextButton }) {
  const schoolOptions = [
    { value: "Wuhan University" },
    { value: "Central China Normal University" },
    { value: "Wuhan University of Technology" }
  ];
  const majorOptions = [
    { value: "Chinese" },
    { value: "Software Engineering" },
    { value: "Enterpraise Management" }
  ];

  const handleSubmit = e => {
    onNextButton();
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  };
  return (
    <Form
      style={{
        paddingTop: "5em",
        paddingBottom: "3em"
      }}
      {...layout}
    >
      <Form.Item
        name="school"
        label="University"
        rules={[{ required: true, message: "Please input your university!" }]}
      >
        <AutoComplete
          style={{ width: 300, textAlign: "left" }}
          options={schoolOptions}
          placeholder="Enter your university"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item
        name="major"
        label="Major"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <AutoComplete
          style={{ width: 300, textAlign: "left" }}
          options={majorOptions}
          placeholder="Enter your major"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Space
        size="small"
        style={{ display: "flex", justifyContent: "center", marginTop: "4em" }}
      >
        <Button
          type="primary"
          disabled={currentStep === 0}
          onClick={onBackButton}
        >
          Back
        </Button>
        <Button type="primary" onClick={handleSubmit} htmlType="submit">
          Next
        </Button>
      </Space>
    </Form>
  );
}

export default SchoolForm;
