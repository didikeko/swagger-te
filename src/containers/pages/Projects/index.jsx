// Libary
import React, { Component, Fragment } from "react";

import Header from "../../organism/Projects/Header";
import Editor from "../../organism/Projects/Editor";
import Docs from "../../organism/Projects/Docs";

// CSS
import "./index.css";

class Project extends Component {
  state = {
    editor_value: "",
    refresh_docs: false,
  };

  handleEditorChange = (editorValue) => {
    this.setState({
      editor_value: editorValue,
    });
  };

  handleEditorUpdated = (value) => {
    let time_delay = 5000;

    setTimeout(() => {
      this.setState({
        refresh_docs: value,
      });
      this.forceUpdate();
    }, time_delay);
  };

  /* shouldComponentUpdate(nextProps, state) {
    console.log("shouldComponentUpdate nextProps", nextProps);
    console.log("shouldComponentUpdate state", state);
    console.log('editorUpdated',this.props.editorUpdated);
    return true;
  }

  // Capture nilai props sebelum dan nilai state sebelum
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate prevProps", prevProps);
    console.log("getSnapshotBeforeUpdate prevState", prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate prevProps", prevProps);
    console.log("componentDidUpdate prevProps", prevState);
    console.log("componentDidUpdate prevProps", snapshot);
  } */

  render() {
    return (
      <Fragment>
        <Header
          onEditorChange={this.state.editor_value}
          editorUpdated={(value) => this.handleEditorUpdated(value)}
        />
        <div className="features">
          <Editor onEditorChange={(value) => this.handleEditorChange(value)} />
          <Docs editorUpdated={this.state.refresh_docs} />
        </div>
      </Fragment>
    );
  }
}

export default Project;
