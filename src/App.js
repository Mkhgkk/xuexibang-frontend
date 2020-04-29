import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Information from "./routes/Information";
import Dashboard from "./routes/Dashboard";
import Mypage from "./routes/Mypage";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const auth = getCurrentUser();
    this.setState({ auth });
  }

  render() {
    const { auth } = this.state;
    return (
      <div className="App">
        <NavBar auth={auth} />
        <Switch>
          <Route path="/userDetail" component={Information} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/mypage" component={Mypage} />

          <Redirect from="/" to="/dashboard/feeds" />
        </Switch>
      </div>
    );
  }
}

export default App;
