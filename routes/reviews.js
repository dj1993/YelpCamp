const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const Review = require('../models/review')
const ExpressError = require('../utils/ExpressError')
const { reviewSchema } = require('../schemas.js')



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        // Joi delivers an array with possibly many error messages
        // We need to join them
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg)

        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    review.save()
    campground.save()
    req.flash('success', 'Successfully created a new review!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// Deleting a review
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    // This only removes the review from its' collection
    // It doesn't remove the reference in the Campgrounds collection
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router