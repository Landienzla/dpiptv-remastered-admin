import React, { useState, Component } from "react";
import axios from "axios";
import { Container, Col, Row, Button, Form, FormCheck, FormGroup } from "react-bootstrap";
export default function AddProduct() {
    const [productDetails, checkProductDetails] = useState({
        duration: "",
        cost: "",
        buynowLink: "",
        btclink: "",
        productCategory: "1device",
      });
    const addProduct = async () => {
        await axios
          .post("http://127.0.0.1:5000/products/add", productDetails)
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
      };
      const addProductHandler = (e) => {
        let categorySwitch = document.getElementById("categorySwitch");
        if (categorySwitch.checked === true) {
          checkProductDetails((prevState) => ({
            ...prevState,
            productCategory: "2devices",
          }));
        } else {
          checkProductDetails((prevState) => ({
            ...prevState,
            productCategory: "1device",
          }));
        }
        const { id, value } = e.target;
        checkProductDetails((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        console.log(productDetails);
      };
    return (
        <div>
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

              <Form.Check
                type="switch"
                id="categorySwitch"
                title="sadgad"
                label="Add Product for '2 Devices' Category "
              />
            <Button type="submit">Add</Button>
          </Form>
        </div>
    )
}
