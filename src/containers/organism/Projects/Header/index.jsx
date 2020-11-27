// Library
import React, { Component } from "react";
import axios from "axios";

// CSS
import "./index.css";

class Header extends Component {
  state = {
    editor_value: "",
  };

  handleSaveButton = async (editorChange) => {
    try {
      if (editorChange) {
        const sendSourceCode = await axios.post(
          "http://localhost:5000/append",
          {
            source_code: editorChange,
          }
        );

        if (sendSourceCode.status === 200) {
          this.setState({
            editor_value: "",
          });

          return this.props.editorUpdated(true);
        }
      }
      console.log("tidak berubah");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let editorChange = this.props.onEditorChange;

    return (
      <div className="navbar">
        <button
          className="button-active"
          onClick={() => this.handleSaveButton(editorChange)}
          disabled={!editorChange}
        >
          Save
        </button>
      </div>
    );
  }
}

export default Header;
