// Library
import React, { Component, Fragment } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { Redirect } from "react-router-dom";

// Config
import { URL } from "../../../../../config/config";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// CSS
import "./index.css";

class CreateProject extends Component {
  state = {
    show: false,
    redirectToProject: "",
  };

  getListProject = async () => {
    const listProject = await axios.get(`${URL}/v1/project`);
    return listProject;
  };

  // Post data form modal
  postFormCreateProject = async (dataProject) => {
    try {
      let sendDataProject = await axios.post(`${URL}/v1/project`, dataProject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic c3dhZ2dlci10ZTp0ZWxrb20=`,
        },
      });

      if (sendDataProject.data.code === 201) {
        // Redirect Project
        let timeout = 1000;
        setTimeout(() => {
          this.setState({
            redirectToProject: `/project/${dataProject.project_name}`,
          });
        }, timeout);
        return this.handleCloseModal();
      }
      console.log("gagal create project");
    } catch (err) {
      console.log(err);
    }
  };

  // Menutup modal create project
  handleCloseModal = () => {
    this.setState({
      show: false,
    });
  };

  // Menampilkan modal create project
  handleShowModal = () => {
    this.setState({
      show: true,
    });
  };

  render() {
    if (this.state.redirectToProject) {
      return <Redirect to={this.state.redirectToProject}></Redirect>;
    }
    return (
      <Formik
        initialValues={{
          project_name: "",
          title: "",
          contacts: "",
          version: "",
          description: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          this.postFormCreateProject(values);
          resetForm();
        }}
        validationSchema={Yup.object().shape({
          project_name: Yup.string().required("Project name is required"),
          title: Yup.string().required("Title is required"),
          contacts: Yup.string().required("Contact is required"),
          version: Yup.string().required("Version is required"),
          description: Yup.string().required("Description is required"),
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
          <Fragment>
            <Button variant="primary" onClick={this.handleShowModal}>
              Create Project
            </Button>
            <Modal show={this.state.show} onHide={this.handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicProject">
                    <Form.Label>root endpoint</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" ex myptm, codex, digiscool, sekolahpijar etc"
                      name="project_name"
                      size="sm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.project_name || ""}
                    />
                    <small className="error-validation">
                      {errors.project_name &&
                        touched.project_name &&
                        errors.project_name}
                    </small>
                  </Form.Group>

                  <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name="title"
                      size="sm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                    <small className="error-validation">
                      {errors.title && touched.title && errors.title}
                    </small>
                  </Form.Group>
                  <Form.Group controlId="formBasicContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contact"
                      name="contacts"
                      size="sm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contacts}
                    />
                    <small className="error-validation">
                      {errors.contacts && touched.contacts && errors.contacts}
                    </small>
                  </Form.Group>
                  <Form.Group controlId="formBasicVersion">
                    <Form.Label>Version</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1.0"
                      name="version"
                      size="sm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.version}
                    />
                    <small className="error-validation">
                      {errors.version && touched.version && errors.version}
                    </small>
                  </Form.Group>
                  <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    <small className="error-validation">
                      {errors.description &&
                        touched.description &&
                        errors.description}
                    </small>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                  >
                    Create
                  </Button>
                  <Button variant="secondary" onClick={this.handleCloseModal}>
                    Close
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Fragment>
        )}
      </Formik>
    );
  }
}

export default CreateProject;
