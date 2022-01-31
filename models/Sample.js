const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    discription: {
        type: String
    },
    profileImg: {
        type: String
    }
})

module.exports = mongoose.model('Sample', sampleSchema, 'Sample');