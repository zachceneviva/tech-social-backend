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
            message: "You have successfully registered.", createdUser
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// Login User
const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({email: req.body.email}).select("+password")

        if (!foundUser) {
            return res.status(400).json({
                status: 400,
                message: "Email or password is incorrect."
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

        if (isMatch) {
            const signedJwt = await jwt.sign(
                {_id: foundUser._id},
                process.env.SUPER_SECRET_KEY,
                { expiresIn: "1h"}
            )
            res.status(200).json({
                status: 200,
                message: "success",
                token: signedJwt,
            })
        } else {
            return res.status(400).json ({
                status: 400,
                message:"Email or password is incorrect."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// Current User Profile
const profile = async (req, res) => {
    try {
        const currentUser = await db.User.findById(req.currentUser)

        return res.json({
            header: req.headers,
            user: currentUser,
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// All Users
const index = async (req, res) => {
    try {
        const allUsers = await db.User.find({})
        return res.status(200).json({allUsers})

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// Show Specific Profile
const show = async (req, res) => {
    try {
        const foundUser = await db.User.findById(req.params.id)
        return res.status(200).json({
            game: foundUser,
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

module.exports = {
    register,
    login,
    profile,
    index,
    show
}