
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
            author: '647a47ea6d7ccb0a941acb9a',
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quibusdam praesentium illo, modi omnis voluptatum repellendus sed quasi magnam. Sint, dignissimos omnis sed dolor numquam sunt maxime pariatur recusandae quia.',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ -73.949721, 40.652601 ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dr1j1blc6/image/upload/v1688416952/YelpHikes/nwcaw3ursumlozvdmk4l.jpg',
                  filename: 'YelpHikes/nwcaw3ursumlozvdmk4l',
                },
                {
                  url: 'https://res.cloudinary.com/dr1j1blc6/image/upload/v1688416952/YelpHikes/ii6sxolbk7qt3f0vxl84.jpg',
                  filename: 'YelpHikes/ii6sxolbk7qt3f0vxl84',
                },
                {
                  url: 'https://res.cloudinary.com/dr1j1blc6/image/upload/v1688416952/YelpHikes/ttezd2jeaivoeyfvkqgp.jpg',
                  filename: 'YelpHikes/ttezd2jeaivoeyfvkqgp',
                },
                {
                  url: 'https://res.cloudinary.com/dr1j1blc6/image/upload/v1688416952/YelpHikes/ebutjplo1voaemlgiwpb.jpg',
                  filename: 'YelpHikes/ebutjplo1voaemlgiwpb',
                },
                {
                  url: 'https://res.cloudinary.com/dr1j1blc6/image/upload/v1688416953/YelpHikes/tftisphee9wmizhavdd7.jpg',
                  filename: 'YelpHikes/tftisphee9wmizhavdd7',
                }
              ]
        })
        await hike.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});