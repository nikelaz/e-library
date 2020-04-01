import React from 'react';
import BooksCard from '../components/Books.jsx';


const Home = () => (
  <div id="Home">
    <div className="container">
      <h1>Welcome to my e-Library</h1>
      <BooksCard />
    </div>
  </div>
);

export default Home;
