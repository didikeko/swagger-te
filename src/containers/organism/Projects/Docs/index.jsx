import React, { Component } from "react";

import "./index.css";

import { URL } from "../../../../config/config";

class Docs extends Component {
  state = {
    projectName: this.props.chooseProject,
  };

  render() {
    return (
      <iframe
        key={this.props.editorUpdated}
        className="iframe"
        src={`${URL}/${this.state.projectName}`}
        frameBorder="0"
        title="api-docs"
      ></iframe>
    );
  }
}

export default Docs;
