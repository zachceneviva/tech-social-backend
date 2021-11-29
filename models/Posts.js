const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Please add text content'],
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    lightbulbs: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    github: {
        type: String,
    },
    image: {
        type:String
    },
    link: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    group: {
        type: mongoose.Types.ObjectId,
        ref: "Group"
    }
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post