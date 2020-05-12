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
import UserContext from "./context/userContext";
import { getUserDetail } from "./services/userService";
import NotFound from "./routes/NotFound";
import Authorization from "./routes/Authorization";
import ScrollToTop from "./ScrollToTop";

class App extends Component {
  state = { auth: getCurrentUser() };

  async componentDidMount() {
    const { data: user } = await getUserDetail();
    this.setState({ user });
  }

  render() {
    const { user, auth } = this.state;

    return (
      <UserContext.Provider value={{ currentUser: user, auth }}>
        <ScrollToTop />
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            {!auth && <Redirect from="/:any" to="/login" />}
            <Route path="/user-detail" component={Information} />
            {user && !user.userName && !user.university && !user.major && (
              <Redirect from="/:any" to="/user-detail" />
            )}
            <Route path="/mypage" component={Mypage} />
            <Route path="/forbidden" component={Authorization} />
            <Route path="/not-found" component={NotFound} />
            {user && !user.isAdmin && (
              <Redirect from="/dashboard/admin" to="/forbidden" />
            )}
            <Route path="/dashboard" component={Dashboard} />
            <Redirect from="/" to="/dashboard/feeds" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
