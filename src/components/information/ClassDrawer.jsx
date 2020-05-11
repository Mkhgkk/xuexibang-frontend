import React, { Component } from "react";
import { Drawer, Divider, Col, Row, Button } from "antd";
import { getUniversity } from "../../services/universityService";
import { getMajor } from "../../services/majorService";

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
  state = {
    university: "",
    major: ""
  };

  componentDidMount = async () => {
    const { course } = this.props;
    const { data: university } = await getUniversity(course.university);
    const { data: major } = await getMajor(course.major);

    this.setState({ university: university.name, major: major.name });
  };

  render() {
    const {
      course,
      onClose,
      visible,
      addCourse,
      removeCourse,
      added
    } = this.props;
    const { university, major } = this.state;

    return (
      <Drawer
        width={400}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div style={{ display: "flex", marginTop: "2em" }}>
          <h2>{course.name}</h2>
          <p style={{ fontSize: "0.9em" }}>{course.number}</p>
        </div>
        <Divider />
        <Row>
          <Col span={24}>
            <DescriptionItem title="University" content={university} />
          </Col>
          <Col span={24}>
            <DescriptionItem title="Major" content={major} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <DescriptionItem title="Professor" content={course.laoshi} />
          </Col>
          <Col span={24}>
            <DescriptionItem title="Class week" content={course.weeks} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Class time" content={course.time} />
          </Col>
          <Col span={24}>
            <DescriptionItem title="Class room" content={course.classroom} />
          </Col>
        </Row>

        <Divider />
        {!added ? (
          <Button type="primary" onClick={() => addCourse(course._id)}>
            Add Class
          </Button>
        ) : (
          <Button onClick={() => removeCourse(course._id)}>Added</Button>
        )}
      </Drawer>
    );
  }
}

export default ClassDrawer;
