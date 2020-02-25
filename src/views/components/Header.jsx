import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-3 mb-5">
            <a className="navbar-brand" href="#">E-Library</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
);

export default Header;