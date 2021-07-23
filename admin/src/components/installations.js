import axios from "axios";
import React, { Component } from "react";
import {
  ListGroup,
  Button,
  ListGroupItem,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import ReactPlayer from "react-player";
export default class installations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installations: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/installations")
      .then((resp) => this.setState({ installations: resp.data }))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="mt-4">
        <Row>
          {this.state.installations.map((installation) => (
            <Col xs="4" key={installation._id} className="text-center mb-3">
              <ListGroup>
                <ListGroupItem>
                    {/* <Button className="mr-2">Update</Button> */}
                  <Button onClick={
                      e => {
                          e.preventDefault()
                          axios.delete(`http://127.0.0.1:5000/installations/${installation._id}/delete`).then(resp=>console.log(resp)).catch(err=>console.log(err))
                      }
                  } variant="danger">
                    Delete
                  </Button>
                </ListGroupItem>

                <ListGroupItem active>
                  Installation Video Id: {installation._id}
                </ListGroupItem>
                <ListGroupItem>Name: {installation.Name}</ListGroupItem>
                <ListGroupItem>
                  <ReactPlayer
                    controls={true}
                    width="300px"
                    height="100%"
                    url={installation.videoLink}
                  />
                  <Button
                    variant="secondary"
                    href={installation.videoLink}
                    target="_blank"
                  >
                    If Video Doesn't Play, Click Me
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <img
                    width="100px"
                    height="100%"
                    src={installation.imageLink}
                    alt="image"
                  />
                </ListGroupItem>
              </ListGroup>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
