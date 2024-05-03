const express = require('express');
const router = express.Router();
const plantControllerMongoDB = require('../controllers/plantControllerMongoDB');

router.get('/api/PlantInfos', plantControllerMongoDB.getPlantInfo);
router.post('/api/PlantInfos', plantControllerMongoDB.createPlantInfo);
router.put('/api/PlantInfos', plantControllerMongoDB.updatePlantInfo);
router.delete('/api/PlantInfos', plantControllerMongoDB.deletePlantInfo);

module.exports = router;