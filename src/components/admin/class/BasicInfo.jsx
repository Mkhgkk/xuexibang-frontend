import React, { Component } from "react";
import { Descriptions, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const inputStyle = {
  border: "none",
  color: "#722ed1",
  width: "100%"
};

class BasicInfo extends Component {
  state = {
    data: {
      university: "Wuhan university",
      major: "Software Engineering",
      classWeek: "1-16 week",
      semester: "2020 Spring",
      professor: "Mr.An",
      classmate: 24,
      classNumber: "123456",
      QQnumber: "12345",
      classTime: "Monday 09:00-11:00",
      classRoom: "Fengyuan3 201",
      note: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = () => {
    this.props.handleEdit();
  };

  render() {
    const { data } = this.state;
    const { editMode } = this.props;
    return (
      <div style={{ overflow: "scroll", height: "60vh", paddingTop: "1em" }}>
        <Descriptions bordered size="middle" column={2}>
          <Descriptions.Item label="University">
            {data.university}
          </Descriptions.Item>
          <Descriptions.Item label="Major">{data.major}</Descriptions.Item>

          <Descriptions.Item label="Class Week">
            {editMode ? (
              <input
                style={inputStyle}
                value={data.classWeek}
                name="classWeek"
                onChange={this.handleChange}
              />
            ) : (
              data.classWeek
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Semester">
            {data.semester}
          </Descriptions.Item>
          <Descriptions.Item label="Professor">
            {editMode ? (
              <input
                style={inputStyle}
                value={data.professor}
                name="professor"
                onChange={this.handleChange}
              />
            ) : (
              data.professor
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Classmate">
            <Button disabled={editMode}>
              <UserOutlined />
              24
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Class Number">123456</Descriptions.Item>
          <Descriptions.Item label="QQ number">
            {editMode ? (
              <input
                style={inputStyle}
                value={data.QQnumber}
                name="QQnumber"
                onChange={this.handleChange}
              />
            ) : (
              data.QQnumber
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Class time">
            {editMode ? (
              <input
                style={inputStyle}
                value={data.classTime}
                name="classTime"
                onChange={this.handleChange}
              />
            ) : (
              data.classTime
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Class room">
            {editMode ? (
              <input
                style={inputStyle}
                value={data.classRoom}
                name="classRoom"
                onChange={this.handleChange}
              />
            ) : (
              data.classRoom
            )}
          </Descriptions.Item>

          <Descriptions.Item span={3} label="Note">
            {editMode ? (
              <textarea
                style={inputStyle}
                value={data.note}
                className="classDetailTextArea"
                name="note"
                onChange={this.handleChange}
              />
            ) : (
              data.note
            )}
          </Descriptions.Item>
        </Descriptions>
        {editMode && (
          <Button
            type="primary"
            onClick={this.handleSubmit}
            style={{ float: "right", marginTop: "2em" }}
          >
            Save
          </Button>
        )}
      </div>
    );
  }
}
export default BasicInfo;
