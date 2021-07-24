import axios from "axios";
import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Button,
  Form,
  Table,
  Container,
} from "react-bootstrap";
import { FolderMinus } from "react-bootstrap-icons";

export default class supportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supportRequests: [],
      solveRequest: false,
      showRequestMessage: false,
      chosenRequestID: null,
      solvedRequestData: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/support/requests")
      .then((resp) => this.setState({ supportRequests: resp.data }))
      .catch((err) => console.log(err));
  }
  solvetheRequest = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://127.0.0.1:5000/support/request/${this.state.chosenRequestID}/solve`,
        this.state.solvedRequestData
      )
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      solvedRequestData: { ...this.state.solvedRequestData, [id]: value },
    });
    console.log(this.state.solvedRequestData)
  };
  render() {
    return (
      <div>
        <Container className="text-center">
          <div className="messageDiv">
            {this.state.chosenRequestID &&
              this.state.supportRequests
                .filter((request) =>
                  request._id.includes(this.state.chosenRequestID)
                )
                .map((request) => (
                  <div className="m-2">
                    <Table>
                      <thead>
                        <tr>
                          <th>Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{request.Message}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Form onSubmit={this.solvetheRequest}>
                      Solve This Request
                      <Form.Group
                        controlId="Message"
                        onChange={this.handleChange}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Message"
                          as="textarea"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Button type="submit" variant="secondary">Send</Button>
                    </Form>
                  </div>
                ))}
          </div>
        </Container>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Reason</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.supportRequests.map((request) => (
              <tr
                onClick={() => {
                  if (this.state.showRequestMessage === true) {
                    this.setState({ showRequestMessage: false });
                  } else {
                    this.setState({ showRequestMessage: true });
                  }
                }}
              >
                <td>{request.Name}</td>
                <td>{request.Email}</td>
                <td>{request.Reason}</td>
                <td>{request.Message}</td>
                <td>{request.createdAt}</td>
                <td>{request.Status}</td>
                <Button
                  variant="secondary"
                  onClick={() => {
                    this.setState({ chosenRequestID: request._id });
                    if (this.state.solveRequest === true) {
                      this.setState({ solveRequest: false });
                    } else {
                      this.setState({ solveRequest: true });
                    }
                    if (this.state.showRequestMessage === false) {
                      this.setState({ showRequestMessage: true });
                    } else {
                      // this.setState({showRequestMessage: false})
                    }
                  }}
                >
                  Solve
                </Button>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
