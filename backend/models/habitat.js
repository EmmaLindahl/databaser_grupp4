const mongoose = require ('mongoose')

//GET: Express hämtar all info från databasen men presenterar bara infon från modellen. Om required inte finns i ett objekt -> error
const Habitat = new mongoose.Schema ({
    habitat : {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('habitat', Habitat)