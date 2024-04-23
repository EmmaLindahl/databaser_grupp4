const mongoose = require ('mongoose')

//Detta är ett sätt att kontrollera den post-request som kommer in till MongoDB. Vad för info som ska finnas och på vilket sätt.
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