// Library
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Login from "../Login";
import Dashboard from "../Dashboard";
import Project from "../Projects";

class Home extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/project/:projectName" component={Project} />
        </Fragment>
      </Router>
    );
  }
}

export default Home;
