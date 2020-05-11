import React from "react";
import photo from "../../image/mailBox.svg";
import { Button } from "antd";
import { Link } from "react-router-dom";

const EmailSent = () => {
  return (
    <div>
      <h2>Email Verification</h2>
      <p>We have sent you email! Check your mail box.</p>
      <Button
        type="primary"
        style={{
          display: "block",
          margin: "0 auto",
          marginBottom: "2em",
          marginTop: "2em"
        }}
      >
        <Link to="/login">Go to Login page</Link>
      </Button>
      <img style={{ width: "30%" }} src={photo} alt="emailSent" />
    </div>
  );
};

export default EmailSent;
