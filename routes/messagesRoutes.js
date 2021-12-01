// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// Creat message
router.post('/', ctrl.messages.create)

// Get messages
router.get('/:id', ctrl.messages.conversationMessages)

module.exports = router