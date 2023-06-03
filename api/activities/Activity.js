const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    _id: String,
    name: String,
    latitude: String,
    longitude: String,
    contact: String
})

module.exports = mongoose.model('Activity', activitySchema);