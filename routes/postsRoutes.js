// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Index
router.get('/', ctrl.posts.index)

// Create route
router.post('/', ctrl.posts.create)

// Update Route
router.put('/:id', )

// Delete Route
router.delete('/:id')

// Export
module.exports = router