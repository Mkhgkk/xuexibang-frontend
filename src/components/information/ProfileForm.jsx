import React, { Component } from "react";
import { Upload, message, Input, Tooltip, Form, Space, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as userSerivce from "../../services/userService";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class ProfileForm extends Component {
  state = {
    loading: false,
    imageUrl: "",
    userName: "",
    ready: false
  };

  componentDidMount = async () => {
    const { data: user } = await userSerivce.getUserDetail();
    this.setState({
      imageUrl: user.avatar,
      userName: user.userName,
      ready: true
    });
  };

  handleAvatarChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  // handleChange = ({ currentTarget: input }) => {
  //   this.setState({ userName: input.value });
  // };

  handleSubmit = async () => {
    const { userName, imageUrl } = this.state;

    try {
      await userSerivce.changeUserInfo({ userName, avatar: imageUrl });
      // if (user.userName) this.props.onNextButton();
      if (userName) this.props.onNextButton();
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { imageUrl, userName, ready } = this.state;
    const { currentStep } = this.props;

    return (
      <>
        {ready && (
          <Form
            style={{
              width: "30%",
              paddingTop: "3em",
              paddingBottom: "1em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            initialValues={{
              ["userName"]: userName
            }}
          >
            <Form.Item name="profile Image" style={{ marginLeft: "10%" }}>
              <Tooltip title="upload your profile photo">
                <QuestionCircleOutlined />
              </Tooltip>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleAvatarChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="userName"
              style={{ width: 200 }}
              rules={[{ required: true, message: "Please input username!" }]}
            >
              <Input
                placeholder="username"
                name="userName"
                value={userName}
                onChange={e => this.setState({ userName: e.target.value })}
              />
            </Form.Item>

            <Space size="small">
              <Button type="primary" disabled={currentStep === 0}>
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                Next
              </Button>
            </Space>
          </Form>
        )}
      </>
    );
  }
}

export default ProfileForm;
