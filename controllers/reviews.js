const Hike = require('../models/hike')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const hike = await Hike.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id
    hike.reviews.push(review);
    await review.save();
    await hike.save();
    req.flash('success', 'New review added!')
    res.redirect(`/hikes/${hike._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Hike.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Review deleted!')
    res.redirect(`/hikes/${id}`)
}