const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema =  new Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        ref: "Conversation",
    },
    sender: {
        _id: {
            type: String
        },
        avatar: {
            type:String
        },
        fullName: {
            type: String
        },
    },
    text: {
        type:String,
    }
}, {timestamps: true}) 


const Message = mongoose.model('Message', MessageSchema)

module.exports = Message