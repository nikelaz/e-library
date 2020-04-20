import React, { useState } from 'react';

function BookSearch(props) {
  const [query, setQuery] = useState('');

  return (
    <form className="mb-5" onSubmit={() => { props.searchHandler(query); }}>
      <div className="row">
        <div className="col-4">
          <input type="text" className="form-control" placeholder="Search..." onChange={(e) => { setQuery(e.target.value); }} />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  );
}

export default BookSearch;