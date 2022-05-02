const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://techonnect.s3.us-east-2.amazonaws.com/default+avatar.jpeg"
    },
    coverPhoto: {
        type: String,
        default: "https://techonnect.s3.us-east-2.amazonaws.com/Default-Banner.png"
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
    github: {
        type: String,
    },
    porfolio: {
        type: String,
    },
    notifications:[{
        type: String,
    }],
    conversationsWith: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    }, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User