const db = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register a new user
const register = async (req, res) => {
    try {
        const foundUserEmail = await db.User.findOne({email: req.body.email})

        if (foundUserEmail) {
            return res.status(400).json({
                status: 400,
                message: "This email addess has already been registered."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt);
        const createdUser = await db.User.create({...req.body, password: hash});

        return res.status(201).json({
            status: 201,
            message: "success", createdUser
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}