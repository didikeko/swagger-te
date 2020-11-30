// Library
import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Config
import { URL } from "../../../config/config";

// CSS
import "./index.css";

// Bootstrap
import { Navbar, Modal, Button, Form } from "react-bootstrap";

class Dashboard extends Component {
  state = {
    show: false,
    formCreateProject: {},
    listProject: [],
    projectName: "",
  };

  // Valaue form modal mengalami perubahan
  handleFormChange = (data) => {
    let valueFormProject = { ...this.state.formCreateProject };
    valueFormProject[data.target.name] = data.target.value;

    this.setState({
      formCreateProject: valueFormProject,
    });
  };

  // Post data form modal
  postFormCreateProject = () => {
    let sendDataProject = axios.post(
      `${URL}/project`,
      this.state.formCreateProject,
      {
        headers: {
          Authorization: `Basic c3dhZ2dlci10ZTp0Zwxrb20`,
        },
      }
    );
    if (sendDataProject.data.code === 200) {
      this.handleCloseModal();
    }
  };

  // Button create di modal
  handleButtonCreateProject = () => {
    this.postFormCreateProject();
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

  getListProject = async () => {
    const listProject = await axios.get(`${URL}/v1/project`, null, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setState({
      listProject: listProject.data.data,
    });
  };

  chooseProject = (event) => {
    this.setState({
      projectName: event.target.text,
    });

    console.log(this.state.projectName);
  };

  componentDidMount = () => {
    this.getListProject();
  };

  render() {
    return (
      <Fragment>
        <Navbar className="navbar">
          {/* Navbar */}
          <Navbar.Brand href="#home">SWAGGER</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="mr-3">
              {localStorage.getItem("userLoggedIn")}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {/* End Navbar */}

        {/* Sidebar */}
        <Button variant="primary" onClick={this.handleShowModal}>
          Create Project
        </Button>
        {/* End Sidebar */}

        {/* List Project */}
        {this.state.listProject.map((project) => {
          return (
            <div className="list-project" key={project.project_name}>
              <ul>
                <li>
                  Project Name :
                  <Link to={`/project/${project.project_name}`}>
                    {project.project_name}
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
        {/* End List Project */}

        {/*  Modal Create Project*/}
        <Modal show={this.state.show} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicProject">
                <Form.Label>Project</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Project Name"
                  onChange={this.handleFormChange}
                  name="project_name"
                  value={this.state.formCreateProject.project || ""}
                />
              </Form.Group>

              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={this.handleFormChange}
                  value={this.state.formCreateProject.title || ""}
                />
              </Form.Group>
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  onChange={this.handleFormChange}
                  value={this.state.formCreateProject.contact || ""}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={this.handleFormChange}
                  name="description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleButtonCreateProject}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Modal Create Project */}
      </Fragment>
    );
  }
}

export default Dashboard;
