const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    favouriteFoods:{
        type: [{
            type: String
        }],
        required: true
    }
},{timestamps: true})

const Person = mongoose.model('person',personSchema)
module.exports = Person