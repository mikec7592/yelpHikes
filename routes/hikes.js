const express = require('express')
const router = express.Router();
const { isLoggedIn, validateHike, isAuthor } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const Hike = require('../models/hike');
const hikes = require('../controllers/hikes')
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(hikes.index))
    .post(isLoggedIn, upload.array('image'), validateHike, catchAsync(hikes.createHike))
    
router.get('/new', isLoggedIn, hikes.renderNewForm)

router.route('/:id')
    .get(catchAsync(hikes.showHike))
    .put(isLoggedIn, isAuthor, validateHike, catchAsync(hikes.updateHike))
    .delete(isLoggedIn, catchAsync(hikes.destroyHike))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(hikes.renderEditForm))

module.exports = router;