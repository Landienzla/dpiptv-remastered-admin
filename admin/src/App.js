import "./App.css";
import { useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
// import * as Icon from 'bootstrap-icons'
function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

function Login() {
  const [username, usernameData] = useState();
  const [password, passwordData] = useState();
  const [loginState, auth] = useState()

  const formSubmit = (e) => {
    axios
      .post("https://reqres.in/api/login", {
        email: username,
        password: password,
      })
      .then((resp) => auth(resp.data.state))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-div" style={{ marginTop: "%10vh" }}>
      {auth ? null : <h1>logged in as {auth}</h1>}
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
          <input name="email"  onChange={(e) => usernameData(e.target.value)}/>
          <br/>
          <input name="password" onChange={(e) => passwordData(e.target.value)}/>
          <br/> 
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </div>
  );
}
export default App;
