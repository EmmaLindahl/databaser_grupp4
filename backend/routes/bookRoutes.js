const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/api/books', bookController.getBooks);
router.get('/api/books/:id', bookController.getBook);
router.post('/api/books', bookController.createBook);
router.put('/api/books', bookController.updateBook);
router.delete('/api/books', bookController.deleteBook);
router.get('/api/books-categories', bookController.getBooksCategories);

module.exports = router;