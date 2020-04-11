import React, { Component } from "react";
import { Skeleton, Card, Avatar, Tag } from "antd";
import CommentBox from "./Comment";

class CardBox extends Component {
  state = {
    loading: false,
    comment: false
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <Card
          style={{ width: "80%", margin: "0 auto", marginTop: 16 }}
          actions={[<div>Comment</div>, <div>3days left</div>]}
        >
          <Skeleton loading={loading} avatar active>
            <Tag
              color="#f50"
              style={{ position: "absolute", right: "0", fontSize: "1em" }}
            >
              作业
            </Tag>
            {/* <Tag
              color="#2db7f5"
              style={{ position: "absolute", right: "0", fontSize: "1em" }}
            >
              通知
            </Tag> */}
            <h1>汉语综合4</h1>

            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <p
                style={{
                  margin: 0,
                  paddingLeft: "0.5em"
                }}
              >
                userName
              </p>
            </div>
            <p style={{ textAlign: "right" }}>7th Sep 2020</p>
            <p style={{ margin: "30px 50px 30px 50px" }}>
              今天下午三点，弘毅学堂邀请了联想集团副总裁贺志强做：『联想未来云课堂』第4课《人工智能的产业应用》，探索人工智能如何推动产业升级！人民网、人民智云、bilibili直播、抖音、今日头条、联想智能课堂等平台均可收看，直播链接https://liveclub.lenovo.com.cn/欢迎参加！
            </p>
          </Skeleton>
        </Card>
      </>
    );
  }
}

export default CardBox;
