const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utilities/expressError');
const methodOverride = require('method-override');

const hikes = require('./routes/hikes')
const reviews = require('./routes/reviews')

// const { error } = require('console');

mongoose.connect('mongodb://localhost:27017/yelp-hike', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db conected');
});

const app = express();

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'mango',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/hikes', hikes)
app.use('/hikes/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
}); 

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Whoops, something went wrong!'
    res.status(statusCode).render('error', { err });
})

const PORT = 3000

app.listen(PORT, () => {
    console.log ('running on port ' + PORT)
}); 