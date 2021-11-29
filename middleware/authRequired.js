const jwt = require('jsonwebtoken')

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

module.exports = authRequired