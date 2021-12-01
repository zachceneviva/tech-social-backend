const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
    },
    coverPhoto: {
        type: String,
        default: "https://leadcoat.com/wp-content/uploads/2019/02/Default-Banner.png"
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
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,       
    },
    techonnections: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    bootcamp: {
        type: String,
        
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