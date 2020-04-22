import React, { useState, useEffect } from 'react';
import ErrorMessage from '../components/Error.jsx';
import SuccessMessage from '../components/Success.jsx';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Edit = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [id, setId] = useState();

    useEffect(() => {
      if (!props.location || !props.location.prop || !props.location.prop.id) return;

      const id = props.location.prop.id;
      
      setId(id);

      fetch(`/api/books/${id}`)
        .then(res => res.json())
        .then(res => {
          setAuthor(res.author);
          setYear(res.publicationYear);
          setTitle(res.title);
          setDescription(res.description);
        })
        .catch(error => console.error(error));
    }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Set error to null by default
        setError(null);
        setSuccess(null);

        fetch('/api/updateBook', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                _id: id,
                title,
                description,
                author,
                publicationYear: year
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
      <h1 className="mb-5">Edit Book</h1>

      <div className="row">
        <div className="col-md-6">
          <ErrorMessage message={error} />
          <SuccessMessage message={success} />
          { redirectToHome ? <Redirect to="/" /> : ''}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" className="form-control" id="author" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="year">Year</label>
              <input type="text" className="form-control" id="year" value={year} onChange={e => setYear(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary mr-3 px-4">Save</button>
            <Link to="/" className="btn btn-danger px-4">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Edit;
