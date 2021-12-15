module.exports.isLoggedIn = (req, res, next) => {
    // 'isAuthenticated" is a Passport method
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login')
    }
    next()
}