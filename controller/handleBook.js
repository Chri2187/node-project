const Books = require('../models/Book');

// GET
const getBook = async (req, res) => {
    try {
        const id = req.params.id;
        // cerco il libro per id
        const book = await Books.findById({ _id: id }).exec();
        if (book) {
            // creo un nuovo oggetto libro senza _id e __v da ritornare
            const { _id, __v, ...newBook } = book.toObject();
            res.setHeader('Content-Type', 'application/json').send(newBook);
        } else {
            res.status(404).json({ message: 'No book found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// POST
const insertBook = async (req, res) => {
    try {
        const { name, author, publisher, edition, pages, releaseDate } =
            req.body;

        const existingBook = await Books.findOne({
            name,
            author,
            publisher,
            edition,
            pages,
            releaseDate,
        });
        // controllo se esiste
        if (existingBook) {
            // controllo edition per fare update
            if (existingBook.edition != edition) {
                existingBook.edition = edition;
                res.setHeader('Content-Type', 'application/json')
                    .status(200)
                    .json({ message: 'Libro aggiornato' });
            } else {
                res.status(400).json({
                    error: 'Libro con stessi dati già esistente',
                });
            }
        }
        // creo nuovo libro
        const newBook = new Books(req.body);
        await newBook.save();
        res.setHeader('Content-Type', 'application/json').json({
            id: newBook._id,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = { insertBook, getBook };
