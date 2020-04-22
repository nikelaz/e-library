import React from 'react';
import { Link } from 'react-router-dom';
import { getFromStorage } from '../../utils/storage';

const renderLoginLinks = (props) => {
  if (!props.tok) {
    return (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/add-book">Add Book</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/search">Search</Link>
      </li>
      <li className="nav-item">
        <span className="nav-link" onClick={() => { logout(props); }} style={{ cursor: 'pointer' }}>Logout</span>
      </li>
    </React.Fragment>
  );
};

const logout = (props) => {
  
  const obj = getFromStorage('e-library');

  if (obj && obj.token) {

    const { token } = obj;

    // Verify token
    fetch('/api/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success){
            props.setToken('');
        }
      });
  } else {
    props.setToken(false);
  }
}

const Header = (props) => (
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
                { renderLoginLinks(props) }
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
);

export default Header;