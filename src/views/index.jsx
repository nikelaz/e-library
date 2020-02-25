import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Header from './components/Header.jsx';
import Home from './routes/Home.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';

const Index = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));
