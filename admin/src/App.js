import "./App.css";
import { useState } from "react";
// import { Container, Col, Row, Button, Form } from "react-bootstrap";
// import axios from "axios";
import Nav from './components/navbar'
import Login from "./components/login";
import Panel from "./components/panel";
import Products from "./components/productsComponent"
import Installation from "./components/installationComponent"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import * as Icon from 'bootstrap-icons'
function App() {
  const [user, userCheck] = useState(window.localStorage.getItem("user"));
  return (
    <div className="App bg-light">
      <Nav user={user}/>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/panel"
            render={(props) => <Panel {...props} user={user} />}
          />
          <Route path="/products"  render={(props) => <Products {...props} user={user}/>}/>
          <Route path="/installation" component={Installation}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
