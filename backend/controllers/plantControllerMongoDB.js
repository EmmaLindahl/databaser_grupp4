const Habitat = require ('../models/habitat')

exports.getHabitat = ( async (req, res) => {
    try {
        const allHabitats = await Habitat.find()
        return res.status(200).json(allHabitats)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});
