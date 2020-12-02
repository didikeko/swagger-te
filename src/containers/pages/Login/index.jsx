// Libary
import React, { Component } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

// Config
import { URL } from "../../../config/config";

// Bootstrap
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// CSS
import "./index.css";

class Login extends Component {
  state = {
    alert: {},
  };

  // Kirim username dan password ke server
  postFormLogin = async (dataUser) => {
    let postDataLogin = await axios.post(`${URL}/v1/auth/login`, dataUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic c3dhZ2dlci10ZTp0ZWxrb20=`,
      },
    });
    if (postDataLogin.data.code === 200) {
      localStorage.setItem("userLoggedIn", postDataLogin.data.data.username);
      return this.props.history.push("/dashboard");
    }

    // Show alert
    this.setState({
      alert: {
        show: true,
        message: "username atau password salah",
      },
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          this.postFormLogin(values);
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Container fluid>
            <Row className="justify-content-center mt-5">
              <Col lg={4} xs={12} className="form-box">
                <Alert variant="warning" show={this.state.alert.show || false}>
                  {this.state.alert.message}
                </Alert>
                <Form onSubmit={handleSubmit} mt={3}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      autoComplete="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <small className="error-validation">
                      {errors.username && touched.username && errors.username}
                    </small>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <small className="error-validation">
                      {errors.password && touched.password && errors.password}
                    </small>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                  >
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    );
  }
}

export default Login;
