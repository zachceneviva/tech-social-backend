const db = require('../models');

// Create Convo
const create = async (req, res) => {
    try {
        const newConvo = await db.Conversation.create({...req.body})
        return res.status(200).json({newConvo})
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// Get all user convos
const allConversations = async (req, res) => {
    try {
        const allConversations = await db.Conversation.find({
            members: {$in: [req.params.id]}
        }).populate({path: "members", select: 'avatar firstName lastName'})
        return res.status(200).json({allConversations})
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

// Get specific convo
const conversation = async (req, res) => {
    try {
        const convo = await db.Conversation.findOne({
            members: {$all: [req.params.firstUserId, req.params.secondUserId]}
        })
        return res.status(200).json({convo})
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

module.exports = {
    create,
    allConversations,
    conversation,
}