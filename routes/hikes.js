const express = require('express')
const router = express.Router();
const { isLoggedIn, validateHike, isAuthor } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const Hike = require('../models/hike');
const hikes = require('../controllers/hikes')


router.get('/', catchAsync(hikes.index)); 

router.get('/new', isLoggedIn, hikes.renderNewForm)

router.post('/', isLoggedIn, validateHike, catchAsync(hikes.createHike))

router.get('/:id', catchAsync(hikes.showHike))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(hikes.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateHike, catchAsync(hikes.updateHike))

router.delete('/:id', isLoggedIn, catchAsync(hikes.destroyHike))

module.exports = router;