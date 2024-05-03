const Plants = require ('../models/plant')

//Get
exports.getPlantInfo = ( async (req, res) => {
    try {
        const allPlantInfos = await Plants.find()
        return res.status(200).json(allPlantInfos)
        // return res.status(200).json(allHabitats.map(x => x.habitat))
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

// exports.getPlantInfos = (async(req, res) => {
//     try {
//         const allPlantInfos = await PlantInfoModel.find();
//         return res.status(200).json(allPlantInfos);
//     }
//     catch (error) {
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// });

// exports.getPlantInfo = (async(req, res) => {
//     const { isbn } = req.params;
//     try {
//         const PlantInfo = await PlantInfoModel.find({isbn: isbn});
//         return res.status(200).json(PlantInfo);
//     }
//     catch (error) {
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// });

exports.createPlantInfo = (async(req, res) => {
    const { descriptionInput, habitatInput, useInput } = req.body;

    try {
        const newPlantInfo = new PlantInfoModel({ description:descriptionInput, habitat:habitatInput, use:useInput });
        const insertedPlantInfo = await newPlantInfo.save();
        return res.status(201).json(insertedPlantInfo);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.updatePlantInfo = (async(req, res) => {
    const { ID, descriptionInput, habitatInput, useInput } = req.body;

    try {
        await PlantInfoModel.updateOne({ _id: ID}, {
            _id: ID,
            description: descriptionInput,
            habitat: habitatInput,
            use: useInput
        });
        const updatedPlantInfo = await PlantInfoModel.find({_id: ID});
        return res.status(200).json(updatedPlantInfo);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.deletePlantInfo = (async(req, res) => {
    const { ID } = req.body;
    try {
        const deletedPlantInfo = await PlantInfoModel.deleteOne({_id: ID});
        return res.status(200).json(deletedPlantInfo)
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});