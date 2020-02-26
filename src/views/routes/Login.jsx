import React, { useState, useEffect } from 'react';
import ErrorMessage from '../components/Error.jsx';
import SuccessMessage from '../components/Success.jsx';
import {
    setInStorage,
    getFromStorage,
  } from '../../utils/storage.js';

const Login = () => {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPass, setSignInPass] = useState('');
    const [isLoading, setIsLoading] = useState('true');
    const [signInError, setSignInError] = useState('null');
    const [tok, setToken] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    useEffect(() => {

        const obj = getFromStorage('e-library');
        if (obj && obj.token) {
        const { token } = obj;

        // Verify token
        fetch('/api/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
            if (json.success) {
                setToken(token);
                setIsLoading('false');
            } else {
                setIsLoading('false');
            }
            });
        } else {
        setIsLoading('false');
        }
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault();

        setIsLoading('true');

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
                setIsLoading('false');
                setSignInEmail('');
                setSignInPass('');
                setToken(json.token);
                setSignInError(json.message);
                setSuccess('Success');
              } else {
                  setSignInError(json.message);
                  setIsLoading('false');
                  setError('Error');
              }
            });
    }

    const logout = () => {
        setIsLoading('true');

        const obj = getFromStorage('e-library');

        if (obj && obj.token) {

          const { token } = obj;

          // Verify token
          fetch('/api/logout?token=' + token)
            .then(res => {
              return res.json()})
            .then(json => {if (json.success){
                  setToken('');
                  setIsLoading('false');
              } else {
                setIsLoading('false');
              }
            });
        } else {
          setIsLoading('false');
          setToken(false);
        }
    }
 
    
if (!tok) {
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

  return (
        <div id="Home">
            <div className="container">
            <h1>Welcome to Login</h1>
            <button onClick={logout}>Logout</button>
            </div>
        </div>
  );
}
  
export default Login;