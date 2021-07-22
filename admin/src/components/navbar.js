import axios from "axios";
import React,{useState} from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function _Navbar(props) {
    const [username,usernameCheck] = useState()

    axios.get(`http://127.0.0.1:5000/users/${props.user}`)
    .then((resp) => usernameCheck(resp.data));
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Welcome Back {username}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/panel">Panel</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/installation">Installation</Nav.Link>
            <Nav.Link href="/support">Support</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <Nav.Link href="/reseller">Reseller</Nav.Link>
            <Nav.Link href="/magfixed">MAG Fixed</Nav.Link>
            <Nav.Link href="/testlink">Test Link</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
