const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plantControllerSQL')

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
router.get('/api/species', plantController.getSpecies)
router.post('/api/species', plantController.createSpecies)
router.put('/api/species', plantController.updateSpecies)
router.delete('/api/species', plantController.deleteSpecies)

//Charlie Routes

module.exports = router