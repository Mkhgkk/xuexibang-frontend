import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
// import Feed from "./routes/Feed";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Information from "./routes/Information";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/information" component={Information} />
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route path="/classes" component={Classes} /> */}
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Redirect from="/" to="/dashboard/feeds" />
      </Switch>
    </div>
  );
}

export default App;
