import React, { Component } from "react";
import { Layout, Card, Row, Col, Button, message } from "antd";
import background from "../image/thumbnail1.svg";
import Infopart from "../components/mypage/Infopart";
import Authpart from "../components/mypage/Authpart";
import * as userService from "../services/userService";
import { getUniversity } from "../services/universityService";
import { getMajor } from "../services/majorService";

const { Content } = Layout;

class Mypage extends Component {
  state = {
    editMode: false,
    user: {},
    university: "",
    major: ""
  };

  componentDidMount = async () => {
    const { data: user } = await userService.getUserDetail();
    const { data: university } = await getUniversity(user.university);
    const { data: major } = await getMajor(user.major);
    this.setState({
      user,
      university: university.name,
      major: major.name
    });
  };

  onClick = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
  };

  handleValue = async (name, value) => {
    const user = { ...this.state.user };
    user[name] = value;

    if (name === "university") {
      const { data: university } = await getUniversity(value);
      this.setState({ user, university: university.name });
    }
    if (name === "major") {
      const { data: major } = await getMajor(value);
      this.setState({ user, major: major.name });
    }
  };

  handleSubmit = async e => {
    const { user } = this.state;
    try {
      await userService.changeUserInfo(user);
      message.success("Changes are saved.");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  render() {
    const { editMode, user, university, major } = this.state;
    return (
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "100vh",
            paddingBottom: "16px",
            paddingTop: "9vh",
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "500px",
            backgroundPosition: "left bottom"
          }}
        >
          <Card
            style={{
              width: "50%",
              margin: "0 auto",
              paddingLeft: "4em",
              paddingRight: "4em",
              position: "relative",
              top: 80
            }}
          >
            {editMode ? (
              <Button
                type="primary"
                onClick={() => {
                  this.handleSubmit();
                  this.onClick();
                }}
                style={{ float: "right", marginRight: "-2em" }}
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={this.onClick}
                style={{ float: "right", marginRight: "-2em" }}
              >
                Edit
              </Button>
            )}

            <h2 style={{ textAlign: "center", marginTop: "1em" }}>My page</h2>

            <Row style={{ paddingTop: "3em", paddingBottom: "2em" }}>
              <Col span={16}>
                <Infopart
                  editMode={editMode}
                  user={user}
                  onChange={this.handleChange}
                  onValue={this.handleValue}
                  university={university}
                  major={major}
                />
              </Col>
              <Col span={8}>
                <Authpart editMode={editMode} avatar={user.avatar} />
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    );
  }
}
export default Mypage;
