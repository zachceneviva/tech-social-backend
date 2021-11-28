const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        text: true,
    },
    description: {
        type: String,
        required: [true, "Please add a group description."] 
    },
    photo: {
        type: String,
    },
    coverPhoto: {
        type: String,
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
}, {timestamps: true})

const Group = mongoose.model('Group', GroupSchema)

module.exports = Group