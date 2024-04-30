const Plants = require ('../models/plant')

exports.getHabitat = ( async (req, res) => {
    try {
        const allHabitats = await Plants.find()
        return res.status(200).json(allHabitats)
        // return res.status(200).json(allHabitats.map(x => x.habitat))
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});
