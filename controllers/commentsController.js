const db = require('../models');

// Index Route
const index = async (req, res) => {
    try {
        const comments = await db.Comment.find({post: req.params.postId}).sort({createdAt: -1}).populate({path: "user", select: 'avatar firstName lastName'});
        if (!comments) return res.json({message: "This post does not have any comments"})
        return res.status(200).json({comments})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

const create = async (req, res) => {
    try {
        const newComment = {...req.body}
        const comment = await db.Comment.create(newComment)

        return res.status(201).json({comment})
    } catch (err) {
        console.log(err)
    }
}

const update = (req, res) => {
    db.Comment.findByIdAndUpdate(req.params.id, {...req.body}, {new:true},
    (error, updatedComment) => {
        console.log(updatedComment)
        if (error) console.log('There was a error updating the post.')
        return res.status(200).json({updatedComment})
    })
}

const destroy = async (req, res) => {
    try {
        await db.Comment.findByIdAndDelete(req.params.id)
        console.log("Comment deleted")
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