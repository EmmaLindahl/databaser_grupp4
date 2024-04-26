const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plantController')

//SQL

//Fungerar - byt ut till stora tabellen
router.get('/api/plants', plantController.getPlants)
//Gör även dessa:
// router.post()
// router.put()
// router.delete()

//Filips Routes

//Mela Routes

//Emmas Routes

//Charlie Routes

module.exports = router