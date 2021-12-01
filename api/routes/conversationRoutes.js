// Imports
const router = require('express').Router()
const ctrl = require('../controllers')

// New Convo
router.post('/', ctrl.conversations.create)

// Get convo of one user
router.get('/:id', ctrl.conversations.allConversations)


// Get convo of two users
router.get('/:fisrtUserId/:secondUserId', ctrl.conversations.conversation)


module.exports = router