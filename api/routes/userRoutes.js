const router = require('express').Router()
const ctrl = require('../controllers')
const authRequired = require('../middleware/authRequired')

//Register
router.post('/register', ctrl.users.register)

// Login
router.post('/login', ctrl.users.login)

// Current User Profile
router.get('/profile', authRequired, ctrl.users.profile)

//Current user connections
router.get('/profile/connections', authRequired, ctrl.users.conections)

// All Users Route
router.get('/', authRequired, ctrl.users.index)

// Show User Route
router.get('/:id', authRequired, ctrl.users.show)

// Update User Route
router.put('/:id', authRequired, ctrl.users.update)

module.exports = router;