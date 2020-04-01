const Book = require('../models/book');
const UserSession = require('../models/session')

module.exports = () => {
  /**
   * POST method
   * Used for book creation
   */
  app.post('/api/books', (req, res) => {
    const sessionQuery = {
      _id: req.body.token,
      isDeleted: false
    };

    // Verify the user token
    UserSession.find(sessionQuery, (error, sessions) => {
      if (error) return res.status(500).end(error.message);
      if (sessions.length != 1) return res.status(500).end('You are unauthorized to add a book. Login first.');

      // Create new book and save it in the database
      const newBook = new Book(req.body.book);
      newBook.save((error) => {
        if (error) res.status(500).end(error.message);
        return res.status(200).end('Book created successfully.');
      });
    });
  });

  /**
   * GET method
   * Used to get all the books
   */
  app.get('/api/getBooks', (req, res) => {
    Book.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

};