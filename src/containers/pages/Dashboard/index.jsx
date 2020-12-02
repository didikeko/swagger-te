// Library
import React, { Component, Fragment } from "react";

// CSS
import "./index.css";

// Component
import Header from "../../organism/Dashboard/Header";
import Sidebar from "../../organism/Dashboard/Sidebar";
import ListProject from "../../organism/Dashboard/ListProject";

class Dashboard extends Component {
  state = {
    listProject: [],
    projectName: "",
  };

  chooseProject = (event) => {
    this.setState({
      projectName: event.target.text,
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <Sidebar />
        <ListProject />
      </Fragment>
    );
  }
}

export default Dashboard;
