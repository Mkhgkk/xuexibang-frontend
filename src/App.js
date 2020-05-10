import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Information from "./routes/Information";
import Dashboard from "./routes/Dashboard";
import Mypage from "./routes/Mypage";
import UserContext from "./context/userContext";
import { getUserDetail } from "./services/userService";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data: user } = await getUserDetail();
    this.setState({ user });
  }

  render() {
    return (
      <UserContext.Provider value={{ currentUser: this.state.user }}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/userDetail" component={Information} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/mypage" component={Mypage} />

            <Redirect from="/" to="/dashboard/feeds" />
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
