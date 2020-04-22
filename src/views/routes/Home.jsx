import React from 'react';
import Books from '../components/Books.jsx';


const Home = (props) => (
  <div id="Home">
    <div className="container">
      <h1 className="mb-5">Welcome to my e-Library</h1>
      <Books tok={props.tok}/>
    </div>
  </div>
);

export default Home;
