import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Information from "./routes/Information";
import Dashboard from "./routes/Dashboard";
import Userpage from "./routes/Userpage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/information" component={Information} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/mypage" component={Userpage} />

        <Redirect from="/" to="/dashboard/feeds" />
      </Switch>
    </div>
  );
}

export default App;
