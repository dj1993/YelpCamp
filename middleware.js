const { campgroundSchema, reviewSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    // 'isAuthenticated" is a Passport method
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login')
    }
    next()
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    // First we find the campground 
    const campground = await Campground.findById(id)
    // Then we check to see if the currently logged on user
    // is the author of the campground
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    // First we find the review 
    const review = await Review.findById(reviewId)
    // Then we check to see if the currently logged on user
    // is the author of the review
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
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
module.exports.validateReview = (req, res, next) => {
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
