const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema =  new Schema({
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }],
}, {timestamps: true}) 


const Conversation = mongoose.model('Conversation', ConversationSchema)

module.exports = Conversation