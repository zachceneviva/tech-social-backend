const router = require('express').Router()
const ctrl = require('../controllers')

//Register
router.post('/register', ctrl.users.register)

// Login
router.post('/login', ctrl.users.login)

module.exports = router;