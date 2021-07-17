import React, { useState, Component } from "react";
import axios from "axios";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Products from "./products";
export default function Panel(props) {
  const [username, usernameCheck] = useState();
  const [productDetails, checkProductDetails] = useState({
    duration: "",
    cost: "",
    buynowLink: "",
    btclink: "",
  });

  //   console.log(window.localStorage.getItem("user"));

  axios
    .get(`http://127.0.0.1:5000/users/${props.user}`)
    .then((resp) => usernameCheck(resp.data));

  const addProduct = async () => {
    await axios
      .post("http://127.0.0.1:5000/products/add", productDetails)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };
  const addProductHandler = (e) => {
    const { id, value } = e.target;
    checkProductDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(productDetails);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col xs="8">
          <h1 className="text-info">Welcome Back {username}</h1>
        </Col>
        <Col xs="4">
          <Button
            onClick={() => {
              window.localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Log Out
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={addProduct}>
            Add Product
            <Form.Group
              className="mb-3"
              controlId="duration"
              onChange={addProductHandler}
              value={productDetails.duration}
            >
              {/* <Form.Label>Product Duration</Form.Label> */}
              <Form.Control type="text" placeholder="Product Duration" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="cost"
              onChange={addProductHandler}
              value={productDetails.cost}
            >
              <Form.Control type="text" placeholder="Product Cost" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="buynowLink"
              onChange={addProductHandler}
              value={productDetails.buynowLink}
            >
              <Form.Control type="text" placeholder="Buy Now Link" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="btclink"
              onChange={addProductHandler}
              value={productDetails.btclink}
            >
              <Form.Control type="text" placeholder="Bitcoin Link" />
            </Form.Group>
{/* 
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Product Category</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group> */} 
            <Button type="submit">Add</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
        <h2>Product List</h2>
        <Products />
        </Col>
      </Row>
    </Container>
  );
}
