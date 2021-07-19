import React, { useState, Component } from "react";
import axios from "axios";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormCheck,
  FormGroup,
} from "react-bootstrap";
import Products from "./products";
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
export default function Panel(props) {
  const [username, usernameCheck] = useState();

  //   console.log(window.localStorage.getItem("user"));

  axios
    .get(`http://127.0.0.1:5000/users/${props.user}`)
    .then((resp) => usernameCheck(resp.data));

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
          <AddProduct />
        </Col>
        <Col>
        <UpdateProduct/>
        </Col>
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
