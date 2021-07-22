import React, { Component } from "react";
import axios from "axios";
import {  Dropdown, DropdownButton } from "react-bootstrap";
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
  render() {
    return (
      <div>
        <DropdownButton
          id="dropdown-basic-button"
          title="Choose Product to Update"
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
      </div>
    );
  }
}
