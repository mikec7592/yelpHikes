
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
        const price = Math.floor(Math.random() * 20) + 10
        const hike = new Hike({
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quibusdam praesentium illo, modi omnis voluptatum repellendus sed quasi magnam. Sint, dignissimos omnis sed dolor numquam sunt maxime pariatur recusandae quia.',
            price
        })
        await hike.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});