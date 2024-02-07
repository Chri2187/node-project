const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    edition: Number,
    pages: {
        type: Number,
        max: 300,
    },
    releaseDate: String,
});

module.exports = mongoose.model('Book', BookSchema);
