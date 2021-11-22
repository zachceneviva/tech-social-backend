const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Please add text content'],
    },
    likes: {
        type: Number,
        default: 0
    },
    lightbulbs: {
        type: Number,
        default: 0
    },
    github: {
        type: String,
    },
    image: {
        type:String
    },
    link: {
        type: String
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post