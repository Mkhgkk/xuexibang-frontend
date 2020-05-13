import React, { Component } from "react";
import { Avatar, Col, Badge } from "antd";

class Chatlist extends Component {
  render() {
    const divStyle = this.props.active
      ? {
          height: 50,
          borderBottom: "1px solid #391085",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#120338"
        }
      : {
          height: 50,
          borderBottom: "1px solid #391085",
          display: "flex",
          alignItems: "center"
        };

    return (
      <div style={divStyle}>
        <Col span={7}>
          <Badge dot={true} status="warning">
            <Avatar style={{ marginLeft: "0.7em" }} />
          </Badge>
        </Col>
        <Col span={17}>
          <p
            style={{
              color: "white",
              fontSize: "0.9em",
              opacity: "0.8",
              margin: 0
            }}
          >
            Anmengning
          </p>
          <p
            style={{
              color: "white",
              fontSize: "0.7em",
              opacity: "0.6",
              margin: 0
            }}
          >
            What the heck are ...
          </p>
        </Col>
      </div>
    );
  }
}

export default Chatlist;
