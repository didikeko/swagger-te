// Libary
import React, { Component } from "react";
import axios from "axios";

// Config
import { URL } from "../../../config/config";

// Bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
  state = {
    formLogin: {},
  };

  // button login ditekan
  handleButtonLogin = (event) => {
    event.preventDefault();
    this.postFormLogin();
  };

  // Kirim username dan password ke server
  postFormLogin = async () => {
    let postDataLogin = await axios.post(
      `${URL}/v1/auth/login`,
      this.state.formLogin,
      {
        headers: {
          Authorization: `Basic c3dhZ2dlci10ZTp0ZWxrb20=`,
        },
      }
    );
    if (postDataLogin.data.code === 200) {
      localStorage.setItem("userLoggedIn", postDataLogin.data.data.username);
      return this.props.history.push("/dashboard");
    }

    console.log("gagal login");
  };

  // Ambil value ketika isi form berubah
  handleFormChange = (data) => {
    let valueFormLogin = { ...this.state.formLogin };
    valueFormLogin[data.target.name] = data.target.value;

    this.setState({
      formLogin: valueFormLogin,
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col lg={4} xs={12} className="form-box">
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={this.handleFormChange}
                  name="username"
                  autoComplete="username"
                  value={this.state.formLogin.username || ""}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.handleFormChange}
                  name="password"
                  autoComplete="current-password"
                  value={this.state.formLogin.password || ""}
                />
              </Form.Group>
              <Button
                variant="primary"
                // type="submit"
                className="float-right"
                onClick={this.handleButtonLogin}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
