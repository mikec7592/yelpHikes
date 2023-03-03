const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Hike = require('./models/hike');

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

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
}); 

app.get('/hikes', async (req, res) => {
    const hikes = await Hike.find({});
    res.render('hikes/index', { hikes })
}); 

app.get('/hikes/:id', async (req, res) => {
    const hike = await Hike.findById(req.params.id)
    res.render('hikes/show', { hike });
})

const PORT = 3000

app.listen(PORT, () => {
    console.log ('running on port ' + PORT)
}); 