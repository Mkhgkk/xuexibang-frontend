import React from "react";
import {
  MailOutlined,
  UserOutlined,
  RocketOutlined,
  NodeIndexOutlined
} from "@ant-design/icons";
import { Space } from "antd";
import InfoEdit from "./InfoEdit";

const Infopart = ({ editMode, user, onChange, onValue, university, major }) => {
  return (
    <div style={{ paddingRight: "2em" }}>
      <p>
        <Space>
          <MailOutlined />
          {user.email}
        </Space>
      </p>
      {editMode && (
        <InfoEdit user={user} onChange={onChange} onValue={onValue} />
      )}
      {!editMode && (
        <>
          <p>
            <Space>
              <UserOutlined />
              {user.userName}
            </Space>
          </p>
          <p>
            <Space>
              <RocketOutlined />
              {university}
            </Space>
          </p>
          <p>
            <Space>
              <NodeIndexOutlined />
              {major}
            </Space>
          </p>
        </>
      )}
    </div>
  );
};

export default Infopart;
