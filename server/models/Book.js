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
    firstSentence: {
        type: String,
        required: false,
    },
    ISBN: {
        type: String,
        required: false,
        unique: true,
    },
    addedDate: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
