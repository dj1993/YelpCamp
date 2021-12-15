const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')

const User = require('../models/user')

const userController = require('../controllers/users')

// Render the registration form for a new user
router.get('/register', userController.renderRegistrationForm)

// Register a new user
router.post('/register', catchAsync(userController.registerUser))

// Render the login page 
router.get('/login', userController.renderLoginPage)

// Login a user
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.loginUser)

// Logout a user
router.get('/logout', userController.logoutUser)

module.exports = router