const express = require('express')
const router = express.Router();
const { hikeSchema} = require('../schemas')
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/expressError');
const Hike = require('../models/hike');


const validateHike = (req, res, next) => {
    const { error } = hikeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const hikes = await Hike.find({});
    res.render('hikes/index', { hikes })
})); 

router.get('/new', (req, res) => {
    res.render('hikes/new');
})

router.post('/', validateHike, catchAsync(async (req, res, next) => {
    // if (!req.body.hike) throw new ExpressError('Invalid data entry.', 400)
   
    const hike = new Hike(req.body.hike);
    await hike.save();
    req.flash('success', 'Successfully added new hike!')
    res.redirect(`/hikes/${hike._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const hike = await Hike.findById(req.params.id).populate('reviews');
    if (!hike) {
        req.flash('error', 'Could not find hike.');
        return res.redirect('/hikes');
    }
    res.render('hikes/show', { hike });
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const hike = await Hike.findById(req.params.id)
    if (!hike) {
        req.flash('error', 'Could not find hike.');
        return res.redirect('/hikes');
    }
    res.render('hikes/edit', { hike });
}))

router.put('/:id', validateHike, catchAsync(async (req, res) => {
    const { id } = req.params;
    const hike = await Hike.findByIdAndUpdate(id, { ...req.body.hike});
    req.flash('success', 'Hike updated!')
    res.redirect(`/hikes/${hike._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Hike.findByIdAndDelete(id);
    req.flash('success', 'Hike deleted!')
    res.redirect('/hikes');
}))

module.exports = router;