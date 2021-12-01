// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Index Route
router.get('/', ctrl.meetups.index)

// Create route
router.post('/', ctrl.meetups.create)

//Show Route
router.get('/:id', ctrl.meetups.show)

// Update Route
router.put('/:id', ctrl.meetups.update)

// Delete Route
router.delete('/:id', ctrl.meetups.destroy)


module.exports = router