const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plantController')

router.get('/api/plants', plantController.getPlants)

module.exports = router