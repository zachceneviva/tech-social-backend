const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User