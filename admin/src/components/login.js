import React from "react";
import { useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import axios from "axios";
export default function Login() {
  const [username, usernameData] = useState();
  const [password, passwordData] = useState();
  const [user, userCheck] = useState(window.localStorage.getItem("user"));
  const formSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/login", {
        username: username,
        password: password,
      })
      .then((resp) => {
        if (resp.data === "60d76c6ab8a2ceec782544a4") {
          window.localStorage.setItem("user", resp.data);
          window.location.href = "/panel";
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    if (e.target.name === "username") {
      usernameData(e.target.value);
    } else if (e.target.name === "password") {
      passwordData(e.target.value);
    }
    console.log(username, password);
  };
  return (
    <div className="login-div" style={{ marginTop: "%10vh" }}>
      {user === "60d76c6ab8a2ceec782544a4" && <Redirect to="/panel" />}
      {user !== "60d76c6ab8a2ceec782544a4" && (
        <Container>
          <a href="http://localhost:3000/home">
            <img
              src="https://dpiptv.com/wp-content/uploads/2020/06/Logo.png"
              alt="logo"
            />
          </a>
          <p>DPIPTV Admin Panel</p>
          {/* <Form onSubmit={formSubmit}>
            <Form.Group controlId="username" className="mt-2">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => usernameData(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => passwordData(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form> */}
          <form onSubmit={formSubmit}>
            <input name="username" onChange={handleChange} />
            <br />
            <input name="password" onChange={handleChange} />
            <br />
            <button type="submit">Submit</button>
          </form>
        </Container>
      )}
    </div>
  );
}
