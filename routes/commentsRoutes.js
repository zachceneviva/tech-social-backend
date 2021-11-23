// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Index
router.get('/', ctrl)

// Create route
router.post('/', ctrl)

// Update Route
router.put('/:id', ctrl)

// Delete Route
router.delete('/:id', ctrl)

// Export
module.exports = router