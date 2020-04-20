import React, { useState } from 'react';
import BookSearch from '../components/BookSearch.jsx';

const Search = () => {
  const [results, setResults] = useState([]);

  const search = query => {
    event.preventDefault();

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

  return (
    <div id="Search">
      <div className="container">
        <h1 className="mb-4">Book Search</h1>
        <BookSearch searchHandler={search} />
        <div className="mb-5">
          { results && results.length > 0 ? <h6>Found {results.length} results:</h6> : '' }
          { results.map((result, index) => <SearchResult key={index} result={result} />)}
        </div>
      </div>
    </div>
  );
};

const SearchResult = (props) => {
  return (
    <React.Fragment>
      <hr className="mt-4 mb-4" />
      <p className="mb-1" style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bolder' }}>{ props.result.occurences } occurences</p>
      <h5>{ props.result.book.title }</h5>
      <p className="mb-2">{ props.result.book.author }</p>
      <p>{ props.result.book.description }</p>
    </React.Fragment>
  );
}

export default Search;
