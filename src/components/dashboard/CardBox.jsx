import React, { Component } from "react";
import { Skeleton, Card, Avatar, Tag } from "antd";
import CommentSection from "./commentSection";
import Actions from "./actions";
import CommentBox from "./commentBox";

class CardBox extends Component {
  state = {
    loading: false,
    comment: false,
  };

  onChange = (checked) => {
    this.setState({ loading: !checked });
  };
  handleClick = () => {
    if (this.state.comment === true) return this.setState({ comment: false });
    if (this.state.comment === false) return this.setState({ comment: true });
  };

  render() {
    const { loading, comment } = this.state;
    return (
      <>
        <Card
          style={{ width: "60%", margin: "0 auto", marginTop: 16 }}
          // actions={[
          //   <span>
          //     <Tooltip title="Comment">
          //       <CommentOutlined />
          //     </Tooltip>
          //     <span> 23 Comments</span>
          //   </span>,
          //   <div>3days left</div>,
          // ]}
        >
          <Skeleton loading={loading} avatar active>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ height: "40px" }}>
                <Tag
                  color="green"
                  // style={{ position: "absolute", right: "0", fontSize: "1em" }}
                >
                  homework
                </Tag>
              </div>

              <h1>Database Management</h1>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    paddingLeft: "0.5em",
                    fontWeight: "bolder",
                  }}
                >
                  userName
                </p>
                <p style={{ textAlign: "right" }}>7th Sep 2020</p>
              </div>
            </div>
            <p style={{ margin: "30px 50px 30px 50px" }}>
              今天下午三点，弘毅学堂邀请了联想集团副总裁贺志强做：『联想未来云课堂』第4课《人工智能的产业应用》，探索人工智能如何推动产业升级！人民网、人民智云、bilibili直播、抖音、今日头条、联想智能课堂等平台均可收看，直播链接https://liveclub.lenovo.com.cn/欢迎参加！
            </p>
            <Actions onClick={this.handleClick} />
            {comment && (
              <React.Fragment>
                <CommentBox />
                <CommentSection>
                  <CommentSection />
                  <CommentSection />
                </CommentSection>
              </React.Fragment>
            )}
          </Skeleton>
        </Card>
      </>
    );
  }
}

export default CardBox;
