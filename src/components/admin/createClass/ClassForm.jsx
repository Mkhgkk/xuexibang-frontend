import React, { Component } from "react";
import {
  Card,
  Form,
  AutoComplete,
  Input,
  Select,
  Col,
  Row,
  Button,
  Upload,
  message
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

const { Option } = Select;

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

class ClassForm extends Component {
  state = {
    loading: false,
    schoolOptions: [],
    majorOptions: [],
    semester: [
      "2020 Spring",
      "2020 Fall",
      "2021 Spring",
      "2021 Fall",
      "2022 Spring",
      "2022 Fall"
    ],
    data: {}
  };

  handleUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false
        });
      });
    }
  };

  onChangeThumb = e => {
    this.setState({
      thumbnail: e.target.value
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleValue = (value, name) => {
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  onSubmit = () => {
    try {
      message.success(
        `${this.state.data.className} has been created successfully.`
      );
    } catch {}
  };

  componentDidMount = () => {
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

    this.setState({ schoolOptions, majorOptions });
  };

  render() {
    const {
      schoolOptions,
      majorOptions,
      semester,
      loading,
      imageUrl,
      data
    } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Card style={{ width: "85%", margin: "0 auto" }}>
        <Form
          {...layout}
          hideRequiredMark
          style={{ paddingTop: "2em", paddingLeft: "3em" }}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label="University"
                rules={[
                  { required: true, message: "Please input university!" }
                ]}
              >
                <AutoComplete
                  onChange={e => this.handleValue(e, "university")}
                  value={data.university}
                  options={schoolOptions}
                  placeholder="Enter university"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              <Form.Item
                label="Major"
                rules={[{ required: true, message: "Please input major!" }]}
              >
                <AutoComplete
                  onChange={e => this.handleValue(e, "major")}
                  value={data.major}
                  options={majorOptions}
                  placeholder="Enter major"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item
                label="Class Name"
                rules={[
                  { required: true, message: "Please input class name!" }
                ]}
              >
                <Input
                  placeholder="Enter class name"
                  name="className"
                  onChange={this.handleChange}
                  value={data.className}
                />
              </Form.Item>

              <Form.Item
                label="Class number"
                rules={[
                  { required: true, message: "Please input class number!" }
                ]}
              >
                <Input
                  placeholder="Enter class number"
                  name="classNumber"
                  onChange={this.handleChange}
                  value={data.classNumber}
                />
              </Form.Item>

              <Form.Item
                label="Semester"
                rules={[{ required: false, message: "Please Choose semester" }]}
              >
                <Select
                  placeholder="Choose semester"
                  onChange={e => this.handleValue(e, "semester")}
                >
                  {semester.map(s => (
                    <Option value={s}>{s}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Professor" rules={[{ required: false }]}>
                <Input
                  placeholder="Enter professor"
                  name="professor"
                  onChange={this.handleChange}
                  value={data.professor}
                />
              </Form.Item>

              <Form.Item label="Class week" rules={[{ required: false }]}>
                <Input
                  placeholder="Enter class Week"
                  name="classWeek"
                  onChange={this.handleChange}
                  value={data.clasWeek}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Class time" rules={[{ required: false }]}>
                <Input
                  placeholder="Enter class time"
                  name="classTime"
                  onChange={this.handleChange}
                  value={data.clasTime}
                />
              </Form.Item>

              <Form.Item label="Classroom" rules={[{ required: false }]}>
                <Input
                  placeholder="Enter classroom"
                  name="classRoom"
                  onChange={this.handleChange}
                  value={data.clasRoom}
                />
              </Form.Item>

              <Form.Item label="QQ number" rules={[{ required: false }]}>
                <Input
                  placeholder="Enter QQ number"
                  name="QQnumber"
                  onChange={this.handleChange}
                  value={data.QQnumber}
                />
              </Form.Item>

              <Form.Item label="Note" rules={[{ required: false }]}>
                <Input.TextArea
                  placeholder="Enter note"
                  name="note"
                  onChange={this.handleChange}
                  value={data.note}
                />
              </Form.Item>
              <Form.Item label="Thumbnail" rules={[{ required: false }]}>
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleUpload}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="thumbnail"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                style={{
                  float: "right",
                  marginRight: "2em"
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.onSubmit}
                >
                  Create class
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default ClassForm;
