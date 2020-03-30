const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  publicationYear: {
    type: Number,
    validate: [yearValidator, 'Year is invalid. It should contain only 4 integers, for example: 2020.'],
    required: [true, 'Publication Year is required']
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
