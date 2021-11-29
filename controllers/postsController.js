const db = require('../models');

const index = async (req, res) => {
    try {
        const posts = await db.Post.find({}).sort({createdAt: -1});
        if (!posts) return res.json({message: "No posts found."})
        return res.status(200).json({posts})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

const create = async (req, res) => {
    try {
        const newPost = {...req.body}
        const post = await db.Post.create(newPost)

        return res.status(201).json({post})
    } catch (err) {
        console.log(err)
    }
}

const update = (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, {...req.body}, {new:true},
    (error, updatedPost) => {
        console.log(updatedPost)
        if (error) console.log('There was a error updating the post.')
        return res.status(200).json({updatedPost})
    })
}

const destroy = async (req, res) => {
    try {
        await db.Post.findByIdAndDelete(req.params.id)
        await db.Comment.deleteMany({post: req.params.id})
        console.log("Post deleted")
        return res.status(200)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    index,
    create,
    update,
    destroy,
}