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
} from "react-bootstrap";

export default class supportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supportRequests: [],
      solveRequest: false,
      showRequestMessage: false,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/support/requests")
      .then((resp) => this.setState({ supportRequests: resp.data }))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        {/* {this.state.supportRequests.map((request) => (
          <ListGroup>
            <ListGroupItem                     onClick={() => {
                      if (this.state.showRequestMessage === true) {
                        this.setState({ showRequestMessage: false });
                      } else {
                        this.setState({ showRequestMessage: true });
                      }
                    }}>
              <Row>
                <Col>Request Info:</Col>
                <Col> {request.Name}</Col>
                <Col>{request.Email}</Col>

                <Col>{request.createdAt}</Col>
                <Col>{request.Status}</Col>
                <Col>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (this.state.solveRequest === true) {
                        this.setState({ solveRequest: false });
                      } else {
                        this.setState({ solveRequest: true });
                      }
                    }}
                  >
                    Solve
                  </Button>
                </Col>
              </Row>
              <Row className="text-center">
                  {this.state.showRequestMessage && (
                      request.Message
                  )}
                  
              </Row>
            </ListGroupItem>
            {this.state.solveRequest && <Form>dasga</Form>}
          </ListGroup>
        ))} */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.supportRequests.map((request) => (
              <tr onClick={() => {
                if (this.state.showRequestMessage === true) {
                  this.setState({ showRequestMessage: false });
                } else {
                  this.setState({ showRequestMessage: true });
                }
              }
              }>
                <td>{request.Name}</td>
                <td>{request.Email}</td>
                <td>{request.Message}</td>
                <td>{request.createdAt}</td>
                <td>{request.Status}</td>
                
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (this.state.solveRequest === true) {
                      this.setState({ solveRequest: false });
                    } else {
                      this.setState({ solveRequest: true });
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
