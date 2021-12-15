const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const Review = require('../models/review')
const ExpressError = require('../utils/ExpressError')
const { reviewSchema } = require('../schemas.js')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')

// Reviews controller
const reviewsController = require('../controllers/reviews')

// Create a new review
router.post('/', isLoggedIn, validateReview, catchAsync(reviewsController.createReview))

// Deleting a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview))

module.exports = router