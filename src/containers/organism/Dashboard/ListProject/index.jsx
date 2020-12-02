// Library
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Config
import { URL } from "../../../../config/config.js";

class ListProject extends Component {
  state = {
    listProject: [],
  };

  getListProject = async () => {
    const listProject = await axios.get(`${URL}/v1/project`);

    this.setState({
      listProject: listProject.data.data,
    });
  };


  componentDidMount() {
    this.getListProject();
  }

  render() {
    return (
      <div className="list-project">
        {this.state.listProject.map((project) => {
          return (
            <div className="project" key={project.project_name}>
              <ul>
                <li>
                  Project Name :
                  <Link to={`/project/${project.project_name}`}>
                    {project.project_name}
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ListProject;
