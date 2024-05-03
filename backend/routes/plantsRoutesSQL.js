const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plantControllerSQL')
const GenusController = require('../controllers/genusControllerSQL')
const BinomialNameController = require('../controllers/BinomialNameControllerSQL')
const SpeciesController = require('../controllers/SpeciesControllerSQL')
const FamilyNameController = require('../controllers/FamilyNameControllerSQL')

//SQL
router.get('/api/Plants', plantController.getPlants)
router.post('/api/Plants', plantController.createPlants)
router.put('/api/Plants', plantController.updatePlants)
router.delete('/api/Plants', plantController.deletePlants)

//Filips Routes
router.get('/api/Genus', GenusController.getGenus)
router.post('/api/Genus', GenusController.createGenus)
router.put('/api/Genus', GenusController.updateGenus)
router.delete('/api/Genus', GenusController.deleteGenus)

//Mela Routes
router.get('/api/BinomialName', BinomialNameController.getBinomialName)
router.post('/api/BinomialName', BinomialNameController.createBinomialName)
router.put('/api/BinomialName', BinomialNameController.updateBinomialName)
router.delete('/api/BinomialName', BinomialNameController.deleteBinomialName)

//Emmas Routes
router.get('/api/Species', SpeciesController.getSpecies)
router.post('/api/Species', SpeciesController.createSpecies)
router.put('/api/Species', SpeciesController.updateSpecies)
router.delete('/api/Species', SpeciesController.deleteSpecies)

//Charlie Routes
router.get('/api/FamilyName', FamilyNameController.getFamilyName)
router.post('/api/FamilyName', FamilyNameController.createFamilyName)
router.put('/api/FamilyName', FamilyNameController.updateFamilyName)
router.delete('/api/FamilyName', FamilyNameController.deleteFamilyName)

module.exports = router
