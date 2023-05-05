const express = require('express');
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utilities/expressError');
const catchAsync = require('../utilities/catchAsync');
const { reviewSchema } = require('../schemas')

const Hike = require('../models/hike');
const Review = require('../models/review');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const hike = await Hike.findById(req.params.id);
    const review = new Review(req.body.review);
    hike.reviews.push(review);
    await review.save();
    await hike.save();
    res.redirect(`/hikes/${hike._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Hike.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/hikes/${id}`)
}))

module.exports = router