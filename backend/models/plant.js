const mongoose = require ('mongoose')

//GET: Express hämtar all info från databasen men presenterar bara infon från modellen. Om required inte finns i ett objekt -> error
const Plants = new mongoose.Schema ({
    habitat : {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('plant', Plants)