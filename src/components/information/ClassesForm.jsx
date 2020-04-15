import React, { Component } from "react";
import { Form, Input } from "antd";

const { Search } = Input;

class ClassesForm extends Component {
  render() {
    return (
      <div>
        <Form>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </Form>
      </div>
    );
  }
}

export default ClassesForm;
