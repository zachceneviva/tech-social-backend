const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        text: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverPhoto: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
        text: true,
    },
    lastName: {
        type: String,
        required: true,
        text: true,
    },
    email: {
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    employment: {
        role: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        }
    },
    techonnections: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    bootcamp: {
        type: String,
        required: true,
    },
    github: {
        type: String,
    },
    porfolio: {
        type: String,
    },
    groups: [{
        type: mongoose.Types.ObjectId,
        ref: "Group"
    }],
    meetups: [{
        type: mongoose.Types.ObjectId,
        ref: "Meetup"
    }],
    notifications:[{
        type: String,
    }]
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User