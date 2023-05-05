const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { hikeSchema, reviewSchema } = require('./schemas')
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/expressError');
const methodOverride = require('method-override');
const Hike = require('./models/hike');
const Review = require('./models/review');
const hikes = require('./routes/hikes')

// const { error } = require('console');

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

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

// const validateHike = (req, res, next) => {
//     const { error } = hikeSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.use('/hikes', hikes)


app.get('/', (req, res) => {
    res.render('home')
}); 

// app.get('/hikes', catchAsync(async (req, res) => {
//     const hikes = await Hike.find({});
//     res.render('hikes/index', { hikes })
// })); 

// app.get('/hikes/new', (req, res) => {
//     res.render('hikes/new');
// })

// app.post('/hikes', validateHike, catchAsync(async (req, res, next) => {
//     // if (!req.body.hike) throw new ExpressError('Invalid data entry.', 400)
   
//     const hike = new Hike(req.body.hike);
//     await hike.save();
//     res.redirect(`/hikes/${hike._id}`)
// }))

// app.get('/hikes/:id', catchAsync(async (req, res) => {
//     const hike = await Hike.findById(req.params.id).populate('reviews');
//     res.render('hikes/show', { hike });
// }))

// app.get('/hikes/:id/edit', catchAsync(async (req, res) => {
//     const hike = await Hike.findById(req.params.id)
//     res.render('hikes/edit', { hike });
// }))

// app.put('/hikes/:id', validateHike, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const hike = await Hike.findByIdAndUpdate(id, { ...req.body.hike});
//     res.redirect(`/hikes/${hike._id}`)
// }))

// app.delete('/hikes/:id', catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Hike.findByIdAndDelete(id);
//     res.redirect('/hikes');
// }))

app.post('/hikes/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const hike = await Hike.findById(req.params.id);
    const review = new Review(req.body.review);
    hike.reviews.push(review);
    await review.save();
    await hike.save();
    res.redirect(`/hikes/${hike._id}`);
}))

app.delete('/hikes/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Hike.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/hikes/${id}`)
}))

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