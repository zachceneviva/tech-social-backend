// Imports
const router = require('express').Router()
const ctrl = require('../controllers')
const uploadImage = require('../middleware/FileUpload')

// Index Route
router.get('/', ctrl.meetups.index)

// Home Banner Route
router.get('/home', ctrl.meetups.homeBanner)

//Group Meetups Route
router.get('/groups/:id', ctrl.meetups.groupMeetups)

// User Meetups Attending
router.get('/profile/:id', ctrl.meetups.meetupsAttending)

// Create route
router.post('/', uploadImage.single('photo'),ctrl.meetups.create)

//Show Route
router.get('/:id', ctrl.meetups.show)

// Update Route
router.put('/:id', ctrl.meetups.update)

// Delete Route
router.delete('/:id', ctrl.meetups.destroy)


module.exports = router