// Imports
const router = require('express').Router()
const ctrl = require('../controllers')
const uploadImage = require('../middleware/FileUpload')

// Index Route
router.get('/', ctrl.groups.index)

// User Groups
router.get('/profile/:id', ctrl.groups.profileGroup)

//HomeBanner Route
router.get('/home', ctrl.groups.homeBanner)

// Create route
router.post('/', uploadImage.fields([{name:"photo", maxCount: 1}, {name:"coverPhoto", maxCount: 1}]),ctrl.groups.create)

//Show Route
router.get('/:id', ctrl.groups.show)

// Update Route
router.put('/:id', ctrl.groups.update)

// Delete Route
router.delete('/:id', ctrl.groups.destroy)



module.exports = router