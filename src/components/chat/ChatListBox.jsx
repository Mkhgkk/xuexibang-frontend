import React, { Component } from "react";
import Chatlist from "./Chatlist";
import { CloseCircleOutlined } from "@ant-design/icons";

class ChatListBox extends Component {
  state = {
    search: false,
    searchValue: "",
    searchResult: []
  };

  onChange = e => {
    const { data } = this.props;
    const value = e.target.value;
    let searchResult = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      searchResult = data.filter(d => regex.test(d.userName));
    }
    this.setState({ searchResult, searchValue: value });
  };

  render() {
    const { searchResult, search, searchValue } = this.state;
    const { data, openChat, currentChatId } = this.props;

    return (
      <div
        style={{
          backgroundColor: "#22075e",
          height: 450,
          width: 170
        }}
      >
        <div
          style={{
            height: 40,
            borderBottom: "1px solid #391085",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <input
            placeholder="Search"
            style={{
              backgroundColor: "#120338",
              border: "none",
              paddingLeft: "5%",
              marginLeft: "5%",
              color: "#bfbfbf",
              borderRadius: "5px",
              width: "80%"
            }}
            value={searchValue}
            onChange={this.onChange}
            onClick={() => this.setState({ search: true })}
          />
          {search && (
            <CloseCircleOutlined
              style={{ color: "white", marginRight: "5%", opacity: 0.6 }}
              onClick={() =>
                this.setState({
                  search: false,
                  searchValue: "",
                  searchResult: []
                })
              }
            />
          )}
        </div>
        {!search && (
          <div style={{ height: 410, overflow: "scroll" }}>
            {data.map(d => (
              <Chatlist
                key={d._id}
                data={d}
                openChat={openChat}
                active={d._id === currentChatId}
              />
            ))}
          </div>
        )}
        {search && (
          <>
            <p
              style={{
                color: "white",
                opacity: 0.6,
                height: 20,
                textAlign: "center",
                margin: "0.5em"
              }}
            >
              Search result
            </p>

            <div style={{ height: 360, overflow: "scroll" }}>
              {searchResult
                ? searchResult.map(d => (
                    <Chatlist
                      key={d._id}
                      data={d}
                      openChat={openChat}
                      active={d._id === currentChatId}
                    />
                  ))
                : null}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default ChatListBox;
