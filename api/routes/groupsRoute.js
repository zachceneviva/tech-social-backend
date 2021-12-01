// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Index Route
router.get('/', ctrl.groups.index)

// Create route
router.post('/', ctrl.groups.create)

//Show Route
router.get('/:id', ctrl.groups.show)

// Update Route
router.put('/:id', ctrl.groups.update)

// Delete Route
router.delete('/:id', ctrl.groups.destroy)


module.exports = router