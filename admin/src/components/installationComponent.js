import axios from "axios";
import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import UpdateInstallation from "./updateInstallation";
export default class installationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installationData: [],
    };
  }
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      installationData: { ...this.state.installationData, [id]: value },
    });
    console.log(this.state.installationData);
  };
  addInstallation = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/installation/add",
        this.state.installationData
      )
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="mt-5">
        <Container>
          <Row>
            <Col>
              <Form onSubmit={this.addInstallation}>
                Add İnstallation Video
                <Form.Group
                  className="mb-3"
                  controlId="Name"
                  onChange={this.handleChange}
                >
                  {/* <Form.Label>Product Duration</Form.Label> */}
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="videoLink"
                  onChange={this.handleChange}
                >
                  <Form.Control type="text" placeholder="Video Link" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="imageLink"
                  onChange={this.handleChange}
                >
                  <Form.Control type="text" placeholder="Image Link" />
                </Form.Group>
                <Button type="submit">Add</Button>
              </Form>
            </Col>
            <Col>
              <UpdateInstallation />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
