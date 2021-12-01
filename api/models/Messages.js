const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema =  new Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        ref: "Conversation",
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    text: {
        type:String,
    }
}, {timestamps: true}) 


const Message = mongoose.model('Message', MessageSchema)

module.exports = Message