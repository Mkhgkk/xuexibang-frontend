import React, { Component } from "react";
import { Layout, Card, Row, Col, Button, message } from "antd";
import background from "../image/thumbnail1.svg";
import Infopart from "../components/mypage/Infopart";
import Authpart from "../components/mypage/Authpart";

const { Content } = Layout;

class Userpage extends Component {
  state = {
    editMode: false,
    userData: {
      email: "testuser1@test.com",
      userName: "Han solo",
      university: "Wuhan university",
      major: "Software Engineering",
      avatar:
        "https://images.unsplash.com/photo-1587204759660-d24d89443807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    }
  };

  onClick = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const userData = { ...this.state.userData };
    userData[input.name] = input.value;
    this.setState({ userData });
  };

  handleSubmit = () => {
    message.success("Changes are saved.");
  };

  render() {
    const { editMode, userData } = this.state;
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
                  userData={userData}
                  onChange={this.handleChange}
                />
              </Col>
              <Col span={8}>
                <Authpart editMode={editMode} avatar={userData.avatar} />
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    );
  }
}
export default Userpage;
