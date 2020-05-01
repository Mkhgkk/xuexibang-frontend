import React, { Component } from "react";
import { Form, Input, message, Modal } from "antd";
import * as userSerivce from "../../services/userService";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};

class ChangePassword extends Component {
  state = {
    email: "",
    password: "",
    newPassword: ""
  };

  componentDidMount = async () => {
    const { data: user } = await userSerivce.getUserDetail();
    const email = user.email;
    this.setState({ email });
  };

  changePassword = async () => {
    const { email, password, newPassword } = this.state;
    try {
      await userSerivce.changePassword(email, password, newPassword);
      this.props.onCancel("passwordModal");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        message.error(ex.response.data);
      }
    }
  };

  render() {
    const { visible, onCancel } = this.props;
    const { email } = this.state;
    return (
      <Modal
        title="Change password"
        visible={visible}
        width={750}
        onOk={this.changePassword}
        onCancel={() => {
          onCancel("passwordModal");
        }}
      >
        <div style={{ width: "80%", paddingTop: "2em" }}>
          {email && (
            <Form
              {...layout}
              name="change password"
              scrollToFirstError
              initialValues={{
                ["email"]: email
              }}
              onValuesChange={obj => {
                this.setState(obj);
              }}
            >
              <Form.Item
                name="email"
                label="email"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input name="email" disabled />
              </Form.Item>
              <Form.Item
                name="password"
                label="Present password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New password"
                rules={[
                  {
                    required: true,
                    message: "Please input new password!"
                  }
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword confirm"
                label="New password confirm"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm new password!"
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two new passwords that you entered do not match!"
                      );
                    }
                  })
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          )}
        </div>
      </Modal>
    );
  }
}

export default ChangePassword;
