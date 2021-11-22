// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Index
router.get('/', ctrl.posts.index)

// Create route
router.post('/', ctrl.posts.create)

// Update Route
router.put('/:id', ctrl.posts.update)

// Delete Route
router.delete('/:id', ctrl.posts.destroy)

// Export
module.exports = router