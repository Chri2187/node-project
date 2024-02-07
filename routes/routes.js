const express = require('express');
const router = express.Router();
const { insertBook, getBook } = require('../controller/handleBook');
const getSong = require('../controller/handleSong');

router.route('/').get((req, res) => {
    res.send('Hello World');
});
router.route('/books/:id').get(getBook);
router.route('/books').post(insertBook);

router.route('/songs').get(getSong);
module.exports = router;
