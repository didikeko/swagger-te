// Library
import React, { Component } from "react";
import axios from "axios";

// CSS
import "./index.css";

// Config
import { URL } from "../../../../config/config.js";

class Header extends Component {
  state = {
    projectName: this.props.chooseProject,
  };

  // Ketika tombol button ditekan
  handleSaveButton = async (editorChange) => {
    try {
      const dataUserLogin = localStorage.getItem("userLoggedIn");
      // Check ada tidak di local storage data user
      if (dataUserLogin) {
        // Check apakah kode editor berubah
        if (editorChange) {
          const sendSourceCode = await axios.put(
            `${URL}/v1/source-code/${this.state.projectName}`,
            {
              source_code: editorChange.split("\n"),
            },
            {
              headers: {
                Authorization: `Basic c3dhZ2dlci10ZTp0ZWxrb20=`,
                "Content-Type": "application/json",
              },
            }
          );

          // Check apakah berhasil mengupdate editor
          if (sendSourceCode.status === 200) {
            return this.props.editorUpdated(1);
          }
          console.log("code editor gagal diupdate");
        }
        console.log("code editor tidak berubah");
      }
      console.log("user tidak berhak untuk mengakses");
    } catch (err) {
      console.log(err);
    }
  };

  updatedEditor = () => {};

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
