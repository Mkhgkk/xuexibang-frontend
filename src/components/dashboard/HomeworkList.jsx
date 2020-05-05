import React, { Component } from "react";
import { List, Avatar } from "antd";
import { getHomeworkById } from "../../services/feedService";
import { getAuthor } from "../../services/userService";

class HomeworkList extends Component {
  state = { homework: [] };

  componentDidMount = async () => {
    const id = this.props.courseId;
    const { data: homework } = await getHomeworkById(id);
    this.setState({ homework });
  };

  getAuthorName = async id => {
    const { data: author } = await getAuthor(id);
    return author.userName;
  };

  getAuthorAvatar = async id => {
    const { data: author } = await getAuthor(id);
    return author.avatar;
  };

  render() {
    const { type } = this.props;
    const { homework } = this.state;
    // const deadline = type === 1 && (
    //   <div>
    //     <br />
    //     Deadline: 22:30
    //   </div>
    // );

    return (
      <List
        itemLayout="horizontal"
        dataSource={homework}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={this.getAuthorAvatar(item.postedBy)} />}
              title={[
                <a href="#">{this.getAuthorName(item.postedBy)}</a>,
                <div style={{ fontWeight: "normal" }}>{item.datePosted}</div>
              ]}
              description={[
                <div>
                  {item.content}
                  {item.deadline}
                </div>
              ]}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default HomeworkList;
