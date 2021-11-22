const db = require('../models');

const index = async (req, res) => {
    try {
        const posts = await db.Post.find({});
        if (!posts) return res.json({message: "No posts found."})
        res.status(200).json({posts})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

const create = async (req, res) => {
    try {
        const newPost = {...req.body}
        const post = await db.Post.create(newPost)

        res.status(201).json({post})
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    index,
    create
}