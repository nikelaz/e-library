import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import BookSearch from '../components/BookSearch.jsx';

const Search = () => {
  const [results, setResults] = useState([]);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const search = query => {
    event.preventDefault();

    if (!query) return;

    fetch(`/api/books/search/${query}`)
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(res => setResults(res))
      .catch(res => {
        res.text()
          .then(err => alert(err));
      });
  };

  const deleteBook = (id) => {
    console.log(`deleteBook(id = ${id});`);

    fetch('/api/deleteBook', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id})
    })
    .then(res => setRedirectToHome(true))
    .catch(error => console.error(error));
  }

  return (
    <div id="Search">
      { redirectToHome ? <Redirect to="/" /> : ''}
      <div className="container">
        <h1 className="mb-4">Book Search</h1>
        <BookSearch searchHandler={search} />
        <div className="mb-5">
          { results && results.length > 0 ? <h6>Found {results.length} results:</h6> : '' }
          { results.map((result, index) => <SearchResult key={index} result={result} deleteBook={deleteBook} />)}
        </div>
      </div>
    </div>
  );
};

const SearchResult = (props) => {
  const deleteHandler = () => {
    const mess = 'Are you sure you want to delete this book?';
    if (!window.confirm(mess)) return;

    props.deleteBook(props.result.book._id);
  }

  return (
    <React.Fragment>
      <hr className="mt-4 mb-4" />
      <p className="mb-1" style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bolder' }}>{ props.result.occurences } occurences</p>
      <h5>{ props.result.book.title }</h5>
      <p className="mb-2">{ props.result.book.author }</p>
      <p>{ props.result.book.description }</p>
      <Link
        to={{ 
          pathname: '/edit-book',
          prop: { id: props.result.book._id }
        }}
        className="btn btn-light px-4 mr-3"
      >
        Edit
      </Link>
      <button className="btn btn-danger px-4" onClick={deleteHandler}>Delete</button>
    </React.Fragment>
  );
}

export default Search;
