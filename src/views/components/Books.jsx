import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


const Books = (props) => {

    const [books, setBooks] = useState([]);
    const [redirectToHome, setRedirectToHome] = useState(false);
    
    
    fetch("/api/getBooks")
        .then(res => res.json())
        .then(
        (result) => {
            setBooks(result);
        },
        (error) => {
            console.error('There has been a problem with your fetch operation:', error)
        }) 

    const reversedArr = books.reverse().slice(0,5)
   
    const deleteBook = (id) => {

        fetch('/api/deleteBook', {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                    _id: id
              })
        })
        .then(res => {
            if (res.ok) return res.text();
            
            setTimeout(() => {
                setRedirectToHome(true);
                }, 1000);
                throw res;
            })
    }

    const mappedData = reversedArr.map((card, i) => {
        
        return( 
            <div class="card mb-2">
                <div key={card} className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{card.author}</h6>
                    <p className="card-text">{card.description}</p>
                    <p className="card-text">{card.publicationYear}</p>
                    <div className="d-flex">
                      <Link to={{ pathname: '/edit-book', prop: { id: card._id }}} className="btn btn-light px-4 mr-3">Edit</Link>
                      <button className="btn btn-danger px-4" onClick={(e) => { if (window.confirm('Are you sure you want to delete this book?')) { deleteBook(card._id) }; }}>Delete</button>
                    </div>
                </div>
            </div>
        )
    })

    const mappedDataLogout = reversedArr.map((card, i) => {
      return
      ( 
        <div class="card">
          <div key={card} className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{card.author}</h6>
            <p className="card-text">{card.description}</p>
            <p className="card-text">{card.publicationYear}</p>
          </div>
        </div>
      );
    });


    if(props.tok){
        return(
        
            <Fragment>
                { redirectToHome ? <Redirect to="/" /> : ''}  
                <div>
                    <h3 className="mb-4">Books recently inserted</h3>
                    {mappedData}
                </div>
            </Fragment>
        
            )
    }


    return(
    
        <Fragment>
            { redirectToHome ? <Redirect to="/" /> : ''}  
            <div>
                <h3>Books recently inserted</h3>
                {mappedDataLogout}
            </div>
        </Fragment>
    
        )
    
}

export default Books;