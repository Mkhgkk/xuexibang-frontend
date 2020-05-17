import React, { Component } from "react";
import MessageHead from "./MessageHead";
import InputBox from "./InputBox";
import Chatroom from "./Chatroom";

class MessengerBox extends Component {
  state = {
    data: {},
    inputValue: ""
  };

  componentDidMount = () => {
    //const id=this.props.chatId
    //fetchWithId
    this.setState({
      data: {
        _id: "1",
        member: [
          { _id: "10", userName: "anmengning", avatar: "" },
          { _id: "11", userName: "Joy", avatar: "" }
        ],
        message: [
          {
            _id: "100",
            content: "Hi",
            postedBy: { _id: "10", userName: "anmengning" }
          },
          {
            _id: "101",
            content: "Hello",
            postedBy: { _id: "11", userName: "Joy" }
          }
        ]
      }
    });
  };

  // componentDidUpdate=(prevProps)=>{
  //   if(prevProps.chatId !==this.props.chatId){
  //     // fetch again with id
  //   }
  // }

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = () => {
    //server save
    let data = { ...this.state.data };
    data.message = [
      ...this.state.data.message,
      {
        content: this.state.inputValue,
        postedBy: { _id: "11", userName: "Joy" }
      }
    ];
    this.setState({ data, inputValue: "" });
  };

  render() {
    const { listOpen, listToggle, onClose } = this.props;
    const { data, inputValue } = this.state;

    return (
      <div
        style={{
          backgroundColor: "#f9f0ff",
          height: 450,
          width: 280
        }}
      >
        <MessageHead
          listOpen={listOpen}
          listToggle={listToggle}
          onClose={onClose}
          you={data && data.member && data.member.find(m => m._id !== "11")}
        />
        <Chatroom data={data && data.message} typing={inputValue} />
        <InputBox
          inputValue={inputValue}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default MessengerBox;
