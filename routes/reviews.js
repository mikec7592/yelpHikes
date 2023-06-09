const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const { validateReview } = require('../middleware')
const Hike = require('../models/hike');
const Review = require('../models/review');


router.post('/', validateReview, catchAsync(async (req, res) => {
    const hike = await Hike.findById(req.params.id);
    const review = new Review(req.body.review);
    hike.reviews.push(review);
    await review.save();
    await hike.save();
    req.flash('success', 'New review added!')
    res.redirect(`/hikes/${hike._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Hike.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Review deleted!')
    res.redirect(`/hikes/${id}`)
}))

module.exports = router