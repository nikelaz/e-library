import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorMessage from '../components/Error.jsx';
import SuccessMessage from '../components/Success.jsx';
import { setInStorage } from '../../utils/storage.js';

const Login = (props) => {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPass, setSignInPass] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (e) => {

        e.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: signInEmail,
              password: signInPass,
            }),
          }).then(res => res.json())
            .then(json => {
              if (json.success) {
                setInStorage('e-library', { token: json.token });
                setSignInEmail('');
                setSignInPass('');
                props.setToken(json.token);
                setSuccess('Success');
              } else {
                  setError('Error');
              }
            });
    }
 
    
if (!props.tok) {
    return (
        <div id="Login">

          <div className="container">
              <h1 className="mb-5">Login</h1>

              <div className="row">

              <div className="col-md-6">
                  <ErrorMessage message={error} />
                  <SuccessMessage message={success} />

                  <form onSubmit={handleSubmit}>

                  <div className="form-group">
                      <label htmlFor="emailInput">Email address</label>
                      <input type="email" className="form-control" id="emailInput" onChange={e => setSignInEmail(e.target.value)} required />
                  </div>
                  <div className="form-group">
                      <label htmlFor="passInput">Password</label>
                      <input type="password" className="form-control" id="passInput" onChange={e => setSignInPass(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>

                  </form>

              </div>

              </div>

          </div>

        </div>
    );
  }

  return <Redirect to="/home" />;
}
  
export default Login;