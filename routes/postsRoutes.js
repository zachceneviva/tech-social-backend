// Imports
const router = require('express').Router()
const ctrl = require('../controllers')
const uploadImage = require('../middleware/FileUpload')

// Index
router.get('/', ctrl.posts.index)

// Create route
router.post('/', uploadImage.single('image'),ctrl.posts.create)

// Update Route
router.put('/:id', ctrl.posts.update)

// Delete Route
router.delete('/:id', ctrl.posts.destroy)

//ProfilePost Route
router.get('/:id', ctrl.posts.profilePosts)

// Only Connections Feed
// router.get('/feed', ctrl.posts.feed)

// Export
module.exports = router