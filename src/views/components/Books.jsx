import React, { useState, Fragment } from 'react';

const Books = () => {

    const [books, setBooks] = useState([]);

        fetch("/api/getBooks")
          .then(res => res.json())
          .then(
            (result) => {
                setBooks(result);
            },
            (error) => {
                console.error('There has been a problem with your fetch operation:', error)
            }
          ) 

    const reversedArr = books.reverse()

    const mappedData = reversedArr.map((card, i) => {
        return(
            
            <div class="card">
                <div key={card.id} className="card-body">
                    <h5 class="card-title">{card.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{card.author}</h6>
                    <p class="card-text">{card.description}</p>
                    <p class="card-text">{card.publicationYear}</p>
                </div>
            </div>
        )
    })

    return(
    <Fragment>  
        <div>
            <h3>Books recently inserted</h3>
            {mappedData}
        </div>
    </Fragment>

    )
}

export default Books;