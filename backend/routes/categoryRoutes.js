const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/api/categories', categoryController.createCategory);
router.get('/api/categories', categoryController.getCategories);

module.exports = router;


//MongoDB & MySQL ser likadant ut i detta steget:
//om man går in på URL:en så skickas man vidare till controllen.Det är i controllern som det hämtas info.  
//Där är det mer specifikt för MongoDB/SQL