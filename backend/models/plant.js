const mongoose = require('mongoose')

const Plants = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    habitat: {
        type: String,
        required: true
    },
    use: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('plant', Plants)