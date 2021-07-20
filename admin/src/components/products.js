import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Button, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
export default class products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((resp) => this.setState({ products: resp.data }))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
      <h2 className="m-3"> Products For 1 Device</h2>
        <Row>
          {/* {this.state.products.map((product) => (
          <Col xs="4" key={product._id} className="text-center border" style={{ backgroundColor: "#9AC2C5" }}> 
              <Container>
                <p className="mt-5" style={{ fontSize: "24px" }}>
                  <b>
                    <h2>{product.duration}</h2>
                  </b>
                </p>
                <p style={{ fontSize: "24px" }}>
                  <b>
                    <h2>{product.cost}</h2>
                  </b>{" "}
                </p>
                <p>{product.productCategory}</p>
                <div className="border border-info m-3 w-25 mx-auto" />
                <p>
                  <Button className="bg-info" href={product.buynowLink}>Buy Now - {product.buynowLink} -</Button>
                </p>
                <div className="border border-info m-3 w-25 mx-auto" />
                <p>
                  <Button className="bg-info" href={product.btcLink}>
                    <Icon.CurrencyBitcoin /> Pay With Bitcoin  -{product.btcLink}-
                  </Button>
                </p>
              </Container>
          </Col> */}
          {this.state.products
            .filter((product) => product.productCategory.includes("1device"))
            .map((product) => (
              <Col
                xs="4"
                key={product._id}
                className="text-center border"
                style={{ backgroundColor: "#9AC2C5" }}
              >
                <Container>
                  <p className="mt-5" style={{ fontSize: "24px" }}>
                    <b>
                      <h2>{product.duration}</h2>
                    </b>
                  </p>
                  <p style={{ fontSize: "24px" }}>
                    <b>
                      <h2>{product.cost}</h2>
                    </b>{" "}
                  </p>
                  <p>{product.productCategory}</p>
                  <div className="border border-info m-3 w-25 mx-auto" />
                  <p>
                    <Button className="bg-info" href={product.buynowLink}>
                      Buy Now - {product.buynowLink} -
                    </Button>
                  </p>
                  <div className="border border-info m-3 w-25 mx-auto" />
                  <p>
                    <Button className="bg-info" href={product.btcLink}>
                      <Icon.CurrencyBitcoin /> Pay With Bitcoin -
                      {product.btcLink}-
                    </Button>
                  </p>
                </Container>
              </Col>
            ))}
            
        </Row>
        <h2 className="m-3"> Products For 2 Devices</h2>
        <Row>
        {this.state.products
            .filter((product) => product.productCategory.includes("2devices"))
            .map((product) => (
              <Col
                xs="4"
                key={product._id}
                className="text-center border"
                style={{ backgroundColor: "#9AC2C9" }}
              >
                <Container>
                  <p className="mt-5" style={{ fontSize: "24px" }}>
                    <b>
                      <h2>{product.duration}</h2>
                    </b>
                  </p>
                  <p style={{ fontSize: "24px" }}>
                    <b>
                      <h2>{product.cost}</h2>
                    </b>{" "}
                  </p>
                  <p>{product.productCategory}</p>
                  <div className="border border-info m-3 w-25 mx-auto" />
                  <p>
                    <Button className="bg-info" href={product.buynowLink}>
                      Buy Now - {product.buynowLink} -
                    </Button>
                  </p>
                  <div className="border border-info m-3 w-25 mx-auto" />
                  <p>
                    <Button className="bg-info" href={product.btcLink}>
                      <Icon.CurrencyBitcoin /> Pay With Bitcoin -
                      {product.btcLink}-
                    </Button>
                  </p>
                </Container>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}
