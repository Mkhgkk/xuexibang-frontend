import React, { Component } from "react";
import Class from "./ClassCard";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

class Classes extends Component {
  state = {
    keys: [1, 2, 3, 4, 5],
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>My Classes</h1>

        <Row gutter={[32, 24]}>
          {this.state.keys.map((v) => (
            <Col span={6}>
              <Link to={`/dashboard/classes/${v.key}`}>
                <Class key={v.key} />
              </Link>
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Classes;
