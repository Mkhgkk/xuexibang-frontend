import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Feed from "./routes/Feed";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
