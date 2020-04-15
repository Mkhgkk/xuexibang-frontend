import React from "react";
import { Form, Input, AutoComplete } from "antd";

function SchoolForm() {
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

  return (
    <Form
      style={{ textAlign: "right", paddingTop: "5em", paddingBottom: "3em" }}
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
    </Form>
  );
}

export default SchoolForm;
