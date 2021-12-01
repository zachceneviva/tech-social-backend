const db = require('../models');

// Create new message
const create = async (req, res) => {
    try {
        const newMessage = await db.Message.create({...req.body})
        return res.status(200).json({newMessage})
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}


// Get convo messages
const conversationMessages = async (req, res) => {
    try {
        const messages = await db.Message.find({conversationId: req.params.id}).populate({path: "sender", select: 'avatar'})
        return res.status(200).json(messages)
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}


module.exports = {
    create,
    conversationMessages,
}