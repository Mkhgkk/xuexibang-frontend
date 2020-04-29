import React, { Component } from "react";
import { Layout, Card, Row, Col, Button, message } from "antd";
import background from "../image/thumbnail1.svg";
import Infopart from "../components/mypage/Infopart";
import Authpart from "../components/mypage/Authpart";
import * as userService from "../services/userService";

const { Content } = Layout;

class Mypage extends Component {
  state = {
    editMode: false,
    user: {}
  };

  componentDidMount = async () => {
    const { data: user } = await userService.getUserDetail();
    this.setState({
      user
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

  handleSubmit = () => {
    message.success("Changes are saved.");
  };

  render() {
    const { editMode, user } = this.state;
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
