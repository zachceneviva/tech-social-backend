const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema =  new Schema({
    content: {
        type: String,
        required: [true, 'There must be content with the comment']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }
}, {timestamps: true}) 


const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment