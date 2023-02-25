
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Hike = require('../models/hike');


mongoose.connect('mongodb://localhost:27017/yelp-hike', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db conected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Hike.deleteMany({});
    for (let i = 0; i < 50; i++){
        const randomNum = Math.floor(Math.random() * 1000);
        const hike = new Hike({
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await hike.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});