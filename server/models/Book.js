const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    // Other fields specific to your Book model
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
