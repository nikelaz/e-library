import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorMessage from '../components/Error.jsx';
import SuccessMessage from '../components/Success.jsx';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set error to null by default
    setError(null);
    setSuccess(null);

    fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        book: {
          title,
          description,
          author,
          publicationYear: year
        }
      })
    })
      .then(res => {
        if (res.ok) return res.text();
        throw res;
      })
      .then(res => {
        if (res !== '') setSuccess(res);
        setTimeout(() => {
          setRedirectToHome(true);
        }, 1000);
      })
      .catch(res => {
        res.text()
          .then(err => setError(err));
      });
  };

  return (
    <div id="AddBook">
      <div className="container">
        <h1 className="mb-5">Add Book</h1>

        <div className="row">
          <div className="col-md-6">
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />
            { redirectToHome ? <Redirect to="/" /> : ''}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" onChange={e => setDescription(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" className="form-control" id="author" onChange={e => setAuthor(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input type="text" className="form-control" id="year" onChange={e => setYear(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default AddBook;
