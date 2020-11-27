import React, { Component } from "react";

import "./index.css";

class Docs extends Component {
  state = {};

  render() {
    return (
      <iframe
        key={this.props.editorUpdated}
        className="iframe"
        src="http://localhost:5000/api-myptm"
        frameBorder="0"
        title="api-docs"
      ></iframe>
    );
  }
}

export default Docs;
