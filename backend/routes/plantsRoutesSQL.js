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
router.get('/api/Genus', plantController.getGenus)
router.post('/api/Genus', plantController.createGenus)
router.put('/api/Genus', plantController.updateGenus)
router.delete('/api/Genus', plantController.deleteGenus)

//Mela Routes
router.get('/api/BinomialName', plantController.getBinomialName)
router.post('/api/BinomialName', plantController.createBinomialName)
router.put('/api/BinomialName', plantController.updateBinomialName)
router.delete('/api/BinomialName', plantController.deleteBinomialName)

//Emmas Routes
router.get('/api/Species', plantController.getSpecies)
router.post('/api/Species', plantController.createSpecies)
router.put('/api/Species', plantController.updateSpecies)
router.delete('/api/Species', plantController.deleteSpecies)

//Charlie Routes

module.exports = router