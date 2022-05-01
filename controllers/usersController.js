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

        let avatar;
        if (req.body.avatar) {
            avatar=req.file?.avatar
        } else {
            avatar = 'https://techonnect.s3.us-east-2.amazonaws.com/default+avatar.jpeg'
        }
        let coverPhoto;
        if (req.body.coverPhoto) {
            coverPhoto=req.file?.coverPhoto
        } else {
            coverPhoto = 'https://techonnect.s3.us-east-2.amazonaws.com/Default-Banner.png'
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt);
        const createdUser = await db.User.create({...req.body, avatar: avatar, coverPhoto: coverPhoto, password: hash});

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
            return res.status(200).json({
                status: 'failed',
                message: "Email or password is incorrect."
            })
        }


        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

        if (isMatch) {
            const signedJwt = await jwt.sign(
                {_id: foundUser._id},
                'leafyseadragon',
                { expiresIn: "24h"}
            )
            res.status(200).json({
                status: 200,
                message: "success",
                token: signedJwt,
            })
        } else {
            return res.status(200).json ({
                status: 'failed',
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

// Current user techonnection
const conections = async (req, res) => {
    try {
        const currentUser = await db.User.findById(req.currentUser).populate({path: 'techonnections', select: 'avatar firstName lastName city state'})
        
        return res.json({
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
            user: foundUser,
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// Update Profile
const update = async (req, res) => {
        try {
            const updatedUser = await db.User.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
            return res.status(200).json({updatedUser})
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
    show,
    update,
    conections
}