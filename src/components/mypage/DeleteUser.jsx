import React, { Component } from "react";
import { Form, Input, message, Modal } from "antd";
import * as userSerivce from "../../services/userService";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { logout } from "../../services/authService";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};

class DeleteUser extends Component {
  state = {
    email: "",
    password: null
  };

  componentDidMount = async () => {
    const { data: user } = await userSerivce.getUserDetail();
    const email = user.email;
    this.setState({ email });
  };

  deleteUser = async () => {
    const { email, password } = this.state;

    try {
      await userSerivce.deleteUser(email, password);
      logout();
      window.location = "/login";
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
        title="Delete account"
        visible={visible}
        width={650}
        onOk={this.deleteUser}
        okText="Delete account"
        okType="danger"
        onCancel={() => onCancel("deleteModal")}
      >
        <div style={{ display: "flex" }}>
          <ExclamationCircleOutlined
            style={{
              color: "#ff7a45",
              fontSize: "1.5em",
              marginRight: "0.6em",
              marginLeft: "0.6em"
            }}
          />
          <p>
            This action is permanent, you wont be able to recover a deleted
            account.
          </p>
        </div>
        <div style={{ width: "80%", paddingTop: "2em" }}>
          {email && (
            <Form
              {...layout}
              name="delete user"
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
                label="Password"
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
            </Form>
          )}
        </div>
      </Modal>
    );
  }
}

export default DeleteUser;
