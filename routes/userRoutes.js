const router = require('express').Router()
const jwt = require('jsonwebtoken')
const ctrl = require('../controllers')

// Auth Required Middleware
const authRequired =  async (req, res, next) => {
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"].split(' ')[1];
        const payload = await jwt. verify(token, process.env.SUPER_SECRET_KEY);
        req.currentUser = payload._id
        next();
    } else {
        res.sendStatus(403)
    }
}

//Register
router.post('/register', ctrl.users.register)

// Login
router.post('/login', ctrl.users.login)

// Current User Profile
router.get('./profile', authRequired, ctrl.users.profile)

module.exports = router;