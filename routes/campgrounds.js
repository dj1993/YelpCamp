const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../schemas.js')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

// Controllers
const campgroundController = require('../controllers/campgrounds')

// Render the index form
router.get('/', catchAsync(campgroundController.index))

// Render the new campground form
router.get('/new', isLoggedIn, catchAsync(campgroundController.renderNewForm))

// Create a campground
router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground))

// Render the show campground page
router.get('/:id', catchAsync(campgroundController.showCampground))

// Render the campground edit form 
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm))

// Editing a campground
router.put('/:id', isLoggedIn, validateCampground, catchAsync(campgroundController.editCampground))

// Deleting a campground
router.delete('/:id', isLoggedIn, catchAsync(campgroundController.deleteCampground))

module.exports = router