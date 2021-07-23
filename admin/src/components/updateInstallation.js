import React, { Component } from "react";
import axios from "axios";
import {
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import ReactPlayer from "react-player";
export default class UpdateInstallation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installations: [],
      chosenInstallationId: null,
      updateInstallation: true,
      installationDetails: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/installations")
      .then((resp) => this.setState({ installations: resp.data }))
      .catch((err) => console.log(err));
  }
  sendUpdate = (e) => {
    axios
      .put(`http://127.0.0.1:5000/installations/${this.state.chosenInstallationId}/update`, this.state.installationDetails)
      .then((resp) => {
        if(resp.status===200){
          window.href="/installation"
        }
        else{
          e.preventDefault()
        }
      })
      .catch((err) => console.log(err));
  };
  updateHandler = (e) => {
    const { id, value } = e.target;
    this.setState({
      installationDetails: { ...this.state.installationDetails, [id]: value },
    });
  };
  render() {
    return (
      <div>
        <DropdownButton
          variant="secondary"
          id="dropdown-basic-button"
          title="Choose Installation Video to Update"
        >
          {this.state.installations.map((installation) => (
            <Dropdown.Item
              href=""
              onClick={() => {
                this.setState({ chosenInstallationId: installation._id });
              }}
            >
              {installation._id} - {installation.Name}{" "}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {this.state.installations
          .filter((installation) =>
            installation._id.includes(this.state.chosenInstallationId)
          )
          .map((installation) => (
            <ListGroup>
              <ListGroupItem active>
                Installation Video Id: {installation._id}
              </ListGroupItem>
              <ListGroupItem>Name: {installation.Name}</ListGroupItem>
              <ListGroupItem >
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
          ))}
        {this.state.chosenInstallationId && (
          <Form onSubmit={this.sendUpdate}>
            Update Installation Data
            <Form.Group
              className="mb-3"
              controlId="Name"
              onChange={this.updateHandler}
              value={this.state.installationDetails.Name}
            >
              <Form.Control type="text" placeholder="New Name" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="videoLink"
              onChange={this.updateHandler}
              value={this.state.installationDetails.videoLink}
            >
              <Form.Control type="text" placeholder="New Video URL" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="imageLink"
              onChange={this.updateHandler}
              value={this.state.installationDetails.imageLink}
            >
              <Form.Control type="text" placeholder="New Image URL" />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </div>
    );
  }
}
