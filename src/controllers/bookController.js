const Book = require('../models/book');

module.exports = () => {
  /**
   * POST method
   * Used for book creation
   */
  app.post('/api/books', (req, res) => {
    // Create new book and save it in the database
    const newBook = new Book(req.body.book);
    newBook.save((error) => {
      if (error) res.status(500).end(error.message);
      return res.status(200).end('Book created successfully.');
    });
  });
};