const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Hike', HikeSchema);