const db = require('../models');

const index = async (req, res) => {
    try {
        const posts = await db.Post.find({group: null}).sort({createdAt: -1}).populate({path: "user", select: 'avatar firstName lastName'});
        if (!posts) return res.json({message: "No posts found."})
        return res.status(200).json({posts})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

const create = async (req, res) => {
    try {
        console.log(req.files)
        const newPost = {...req.body}
        console.log(req.body)
        const post = await db.Post.create({...newPost, image: req.files ? req.files?.location : ''})

        const returnPost = await db.Post.findOne({_id: post._id}).populate('user', '_id avatar firstName lastName')

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

const profilePosts = async (req, res) => {
    try {
        const posts = await db.Post.find({user: req.params.id, group: null}).sort({createdAt: -1}).populate({path: "user", select: 'avatar firstName lastName'});
        if (!posts) return res.json({message: "No posts found."})
        return res.status(200).json({posts})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

//Feed Controller


module.exports = {
    index,
    create,
    update,
    destroy,
    profilePosts
}