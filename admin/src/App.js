import "./App.css";
import { useState } from "react";
// import { Container, Col, Row, Button, Form } from "react-bootstrap";
// import axios from "axios";

import Login from "./components/login";
import Panel from "./components/panel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import * as Icon from 'bootstrap-icons'
function App() {
  const [user, userCheck] = useState(window.localStorage.getItem("user"));
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/panel"
            render={(props) => <Panel {...props} user={user} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
