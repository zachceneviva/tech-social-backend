// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Index
router.get('/:postId', ctrl.comments.index)

// Create route
router.post('/:postId', ctrl.comments.create)

// Update Route
router.put('/:postId/:id', ctrl.comments.update)

// Delete Route
router.delete('/:postId/:id', ctrl.comments.destroy)

// Export
module.exports = router