import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  DropdownButton,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
export default class updateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      chosenProductId: null,
      updateProduct: false,
      productDetails: {
        duration: "",
        cost: "",
        buynowLink: "",
        btcLink: "",
      },
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((resp) => this.setState({ products: resp.data }))
      .catch((err) => console.log(err));
  }

  update = (e) => {
    e.preventDefault();
    // let config = {
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // };
    axios
      .put(
        `http://localhost:5000/products/${this.state.chosenProductId}`,
        this.state.productDetails
      )
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
  };
  updateHandler = (e) => {
    const { id, value } = e.target;
    this.setState({
      productDetails: { ...this.state.productDetails, [id]: value },
    });
    console.log(this.state.productDetails);
  };
  render() {
    return (
      <div>
        <Container>
          <DropdownButton
            id="dropdown-basic-button"
            title="Choose Product to Update"
          >
            {this.state.products.map((product) => (
              <Dropdown.Item
                href=""
                onClick={() => {
                  this.setState({ chosenProductId: product._id });
                }}
              >
                {product._id} - {product.duration} - {product.cost} -{" "}
                {product.productCategory}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          {this.state.products
            .filter((product) =>
              product._id.includes(this.state.chosenProductId)
            )
            .map((product) => (
              <ListGroup>
                <ListGroupItem active>Product Id: {product._id}</ListGroupItem>
                <ListGroupItem>Duration: {product.duration}</ListGroupItem>
                <ListGroupItem>Cost: {product.cost}</ListGroupItem>
                <ListGroupItem>
                  BuyNow Link:{" "}
                  <a href={product.buynowLink}>{product.buynowLink}</a>
                </ListGroupItem>
                <ListGroupItem>
                  Buy With BTC Link:{" "}
                  <a href={product.btcLink}> {product.btcLink}</a>
                </ListGroupItem>
              </ListGroup>
            ))}
          {this.state.chosenProductId && (
            <Form onSubmit={this.update}>
              Update Product
              <Form.Group
                className="mb-3"
                controlId="duration"
                onChange={this.updateHandler}
                value={this.state.productDetails.duration}
              >
                {/* <Form.Label>Product Duration</Form.Label> */}
                <Form.Control type="text" placeholder="New  Duration" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="cost"
                onChange={this.updateHandler}
                value={this.state.productDetails.cost}
              >
                <Form.Control type="text" placeholder="New  Cost" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="buynowLink"
                onChange={this.updateHandler}
                value={this.state.productDetails.buynowLink}
              >
                <Form.Control type="text" placeholder="New Buy Now Link" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="btcLink"
                onChange={this.updateHandler}
                value={this.state.productDetails.btcLink}
              >
                <Form.Control type="text" placeholder="New Bitcoin Link" />
              </Form.Group>
              {/* <Form.Check
                type="switch"
                id="categorySwitch"
                title="sadgad"
                label="Add Product for '2 Devices' Category "
              /> */}
              <Button type="submit">Update</Button>
            </Form>
          )}
        </Container>
      </div>
    );
  }
}
