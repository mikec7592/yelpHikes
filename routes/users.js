const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const users = require('../controllers/auth')
const passport = require('passport');
const { storeReturnTo } = require('../middleware');


router.route('/register')
    .get(users.renderRegister)
    .post(storeReturnTo, catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),users.loginUser)

router.get('/logout', users.logoutUser); 

module.exports = router;