// Libary
import React, { Component, Fragment } from "react";

// Component
import Header from "../../organism/Projects/Header";
import Editor from "../../organism/Projects/Editor";
import Docs from "../../organism/Projects/Docs";

// CSS
import "./index.css";

class Project extends Component {
  state = {
    editor_value: "",
    refresh_docs: false,
    projectName: this.props.match.params.projectName,
  };

  handleEditorChange = (editorValue) => {
    this.setState({
      editor_value: editorValue,
    });
  };

  handleEditorUpdated = (value) => {
    let time_delay = 5000;

    setTimeout(() => {
      // Refresh document di set true
      this.setState({
        refresh_docs: value,
      });

      this.forceUpdate();
    }, time_delay);
  };

  render() {
    return (
      <Fragment>
        <Header
          onEditorChange={this.state.editor_value}
          editorUpdated={(value) => this.handleEditorUpdated(value)}
          chooseProject={this.state.projectName}
        />
        <div className="features">
          <Editor
            onEditorChange={(value) => this.handleEditorChange(value)}
            chooseProject={this.state.projectName}
          />
          <Docs
            editorUpdated={this.state.refresh_docs}
            chooseProject={this.state.projectName}
          />
        </div>
      </Fragment>
    );
  }
}

export default Project;
