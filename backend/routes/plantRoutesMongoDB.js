const express = require('express');
const router = express.Router();
const plantControllerMongoDB = require('../controllers/plantControllerMongoDB');

router.get('/api/habitat', plantControllerMongoDB.getHabitat);

module.exports = router;