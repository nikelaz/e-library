import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getFromStorage } from '../utils/storage';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Header from './components/Header.jsx';
import Home from './routes/Home.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';

const Index = () => {
  const [ tok, setToken ] = useState('');

  useEffect(() => {
    const obj = getFromStorage('e-library');
    if (obj && obj.token) {
      const { token } = obj;

      // Verify token
      fetch('/api/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) setToken(token);
        });
    }
}, []);

  return (
    <Router>
      <Header tok={tok} setToken={setToken} />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login tok={tok} setToken={setToken} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
