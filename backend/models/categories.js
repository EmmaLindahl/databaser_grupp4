//För MongoDB
const mongoose = require ('mongoose')

//POST: Detta är en model som visar hur nya objekt som läggs in ser ut. Om de fält som är required inte finns med i POST-info -> error
//GET: Express hämtar all info från databasen men presenterar bara infon från modellen. Om required inte finns i ett objekt -> error
const Category = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    id : {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('category', Category)