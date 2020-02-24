import React, { useState } from 'react';
import ErrorMessage from '../components/Error.jsx';
import SuccessMessage from '../components/Success.jsx';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set error to null by default
    setError(null);
    setSuccess(null);

    // Check if passwords match
    if (pass === '' || pass !== repeatPass) {
      setError('The two passwords do not match.');
      return;
    }

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email,
          password: pass,
          phone
        }
      })
    })
      .then(res => {
        if (res.ok) return res.text();
        throw res;
      })
      .then(res => {
        if (res !== '') setSuccess(res);
      })
      .catch(res => {
        res.text()
          .then(err => setError(err));
      });
  };

  return (
    <div id="Register">
      <div className="container">
        <h1 className="mb-5">Register</h1>

        <div className="row">
          <div className="col-md-6">
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input type="email" className="form-control" id="emailInput" onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="passInput">Password</label>
                <input type="password" className="form-control" id="passInput" onChange={e => setPass(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="repeatPassInput">Repeat Password</label>
                <input type="password" className="form-control" id="repeatPassInput" onChange={e => setRepeatPass(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="phoneInput">Phone Number</label>
                <input type="tel" className="form-control" id="phoneInput" onChange={e => setPhone(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
