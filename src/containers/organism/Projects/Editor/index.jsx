// Library
import React, { Component } from "react";
import AceEditor from "react-ace";
import axios from "axios";

// Config Ace Editor
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-vibrant_ink";

// Config
import { URL } from "../../../../config/config";

class Editor extends Component {
  state = {
    editor_value: "",
    projectName: this.props.chooseProject,
  };

  // Dapatkan source code dari server
  getSourceCode = async () => {
    try {
      const readFile = await axios.get(
        `${URL}/v1/source-code/${this.state.projectName}`
      );

      this.setState({
        editor_value: readFile.data.data.join("\n"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle ketika editor berubah
  handleEditorChange(editorValue) {
    this.setState({
      editor_value: editorValue,
    });

    this.props.onEditorChange(this.state.editor_value);
  }

  componentDidMount() {
    this.getSourceCode();
  }

  render() {
    return (
      <AceEditor
        className="text-editor"
        mode="javascript"
        theme="vibrant_ink"
        onChange={(editorValue) => this.handleEditorChange(editorValue)}
        value={this.state.editor_value || ""}
        width="50%"
        height="1000px"
        // name="UNIQUE_ID_OF_DIV"
        fontSize="12pt"
        // showPrintMargin={false}
        editorProps={{
          $blockScrolling: true,
        }}
      />
    );
  }
}

export default Editor;
