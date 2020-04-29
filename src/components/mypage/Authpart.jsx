import React, { Component } from "react";
import { Avatar, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

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

class Authpart extends Component {
  state = {
    loading: false,
    imageUrl: this.props.avatar
  };

  handleChange = info => {
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

  render() {
    const { imageUrl } = this.state;
    const { editMode, avatar } = this.props;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {editMode ? (
          <div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        ) : avatar ? (
          <Avatar size={105} src={avatar} />
        ) : (
          <Avatar size={105} icon={<UserOutlined />} />
        )}

        {editMode && (
          <>
            <Button style={{ marginTop: "1em" }}>Change password</Button>
            <Button style={{ marginTop: "1em" }}>Delete account</Button>
          </>
        )}
      </div>
    );
  }
}

export default Authpart;
