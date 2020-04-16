import React, { Component } from "react";
import {
  Drawer,
  List,
  Avatar,
  Divider,
  Col,
  Row,
  Button,
  Spin,
  Tooltip
} from "antd";
import { PlusCircleTwoTone, MinusCircleOutlined } from "@ant-design/icons";

const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
        display: "inline-block"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class ClassDrawer extends Component {
  state = { visible: false, loading: true, data: {} };

  componentDidMount() {
    //props에 있는 번호불러와서서치 하고 펫치함
    const data = {
      name: "线性代数",
      classNumber: "123456",
      photo:
        "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=2610458130,2042626113&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=a5d4b2a53129de0117253c5343c0e2d6",
      university: "Wuhan University",
      major: "Software Engineering",
      professor: "Mr.An",
      classWeek: "1-16week",
      classTime: "9:00-11:00",
      classRoom: "Fengyuan1-301"
    };
    this.setState({ data, loading: false });
  }
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Spin style={{ marginTop: "2em" }} />
        ) : (
          <>
            <List
              style={{ width: "400px" }}
              dataSource={[
                {
                  name: data.name,
                  description: data.classNumber,
                  avatar: data.photo
                }
              ]}
              bordered
              renderItem={item => (
                <List.Item
                  style={{ backgroundColor: "white" }}
                  key={item.id}
                  actions={[
                    <a onClick={this.showDrawer} key={`a-${item.id}`}>
                      View Class
                    </a>,
                    <Tooltip placement="rightTop" title={"Add class"}>
                      <PlusCircleTwoTone
                        twoToneColor="#722ed1"
                        style={{ fontSize: "1.2em" }}
                      />
                    </Tooltip>
                    // <Tooltip placement="rightTop" title={"Delete class"}>
                    //   <MinusCircleOutlined style={{ fontSize: "1.2em" }} />
                    // </Tooltip>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.name}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
            <Drawer
              width={400}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <div style={{ display: "flex", marginTop: "2em" }}>
                <h2>线性代数</h2>
                <p style={{ fontSize: "0.9em" }}>1234456</p>
              </div>
              <Divider />
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="University"
                    content={data.university}
                  />
                </Col>
                <Col span={24}>
                  <DescriptionItem title="Major" content={data.major} />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <DescriptionItem title="Professor" content={data.professor} />
                </Col>
                <Col span={24}>
                  <DescriptionItem
                    title="Class week"
                    content={data.classWeek}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="Class time"
                    content={data.classTime}
                  />
                </Col>
                <Col span={24}>
                  <DescriptionItem
                    title="Class room"
                    content={data.classRoom}
                  />
                </Col>
              </Row>

              <Divider />
              <Button type="primary">Add Class</Button>
              {/* <Button type="primary" disabled>
            Added
          </Button> */}
            </Drawer>
          </>
        )}
      </div>
    );
  }
}

export default ClassDrawer;
