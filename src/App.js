import React from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Feed from "./components/dashboard/Feed";
import { Layout } from "antd";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Layout>
        <SideBar />
        <Switch>
          <Route exact path="/" component={Feed} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
