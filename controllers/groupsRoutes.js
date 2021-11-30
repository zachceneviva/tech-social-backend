const db = require('../models');

const index = async (req, res) => {
    try {
        const groups = await db.Group.find({});
        if (!groups) return res.json({message: "No groups found."})
        return res.status(200).json({groups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

const create = async (req, res) => {
    let photo;
    if(req.body.photo === null) {
        photo = undefined
    } else {
        photo = req.body.photo
    }
    let coverPhoto;
    if (req.body.coverPhoto === null) {
        coverPhoto = undefined
    } else {
        coverPhoto = req.body.coverPhoto
    }
    try {

        const newGroup = {...req.body, photo, coverPhoto}
        const group = await db.Group.create(newGroup)
        console.log(group)
        return res.status(201).json({group})
    } catch (err) {
        console.log(err)
    }
}

const update = (req, res) => {
    db.Group.findByIdAndUpdate(req.params.id, {...req.body}, {new:true},
    (error, updatedGroup) => {
        console.log(updatedGroup)
        if (error) console.log('There was a error updating the group.')
        return res.status(200).json({updatedGroup})
    })
}

const destroy = async (req, res) => {
    try {
        await db.Group.findByIdAndDelete(req.params.id)
        await db.Post.deleteMany({group: req.params.id})
        await db.Comment.deleteMany({post: req.params.id})
        console.log("Group deleted")
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