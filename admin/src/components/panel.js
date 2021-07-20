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
  const [productList, productListChecker] = useState(0);
  const [productListButton, openProductsChecker] = useState("Open")

  //   console.log(window.localStorage.getItem("user"));
  const showProductList = () =>{
    if(productList === 1){
      productListChecker(0)
      openProductsChecker("Open")
    }
    else{
      productListChecker(1)
      openProductsChecker("Close")
    }
  }
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
          <UpdateProduct />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={showProductList}>
            {productListButton} Product List
          </Button>
          {productList ? <Products /> : null}
        </Col>
      </Row>
    </Container>
  );
}
