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
  });

  /**
   * GET search method
   * Searches all books fields for a string query occurence
   */
  app.get('/api/books/search/:query', async (req, res) => {
    let books;

    // Retrieve the books which include the search query
    // from the model using case-insensitive regex
    try {
      books = await Book.find({
        $or: [
          { title: { '$regex': new RegExp(req.params.query, 'i') } },
          { description: { '$regex': new RegExp(req.params.query, 'i') } },
          { author: { '$regex': new RegExp(req.params.query, 'i') } }
        ]
      }).exec();
    } catch (error) {
      return res.status(500).end(error.message);
    }

    if (!books || books.length === 0) return res.json([]);

    // Count occurences of search query of each book and add
    // the book and number of occurences to an object
    const booksAndOccurences = books.map(book => {
      // Stringifying attribute values for faster string search
      const bookStr = `${book.title} ${book.author} ${book.description}`;

      // Record number of occurences using .match string regex search
      const occurences = (bookStr.match(new RegExp(req.params.query, 'gi')) || []).length;

      // Set the occurences property in the book object
      return {
        book,
        occurences
      }
    });

    // Sort books by number of occurences
    booksAndOccurences.sort((x, y) => x.occurences < y.occurences);

    return res.json(booksAndOccurences);
  })

};