const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');


router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', storeReturnTo, catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        const redirectUrl = res.locals.returnTo || '/hikes';
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome!')
            res.redirect(redirectUrl)
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect(redirectUrl);
    }  
}));

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),(req, res) => {
    req.flash('success', `Welcome back ${req.user.username}` );
    const redirectUrl = res.locals.returnTo || '/hikes';
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/hikes');
    });
}); 

module.exports = router;