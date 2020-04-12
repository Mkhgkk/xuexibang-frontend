import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Feed from "./routes/Feed";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Information from "./routes/Information";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/information" component={Information} />
        <Route exact path="/" component={Feed} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
