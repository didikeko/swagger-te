// Library
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar className="navbar">
        <Navbar.Brand href="#home">SWAGGER</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="mr-3">
            {localStorage.getItem("userLoggedIn")}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
