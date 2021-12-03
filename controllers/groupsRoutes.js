const db = require('../models');

const index = async (req, res) => {
    try {
        const groups = await db.Group.find({}).sort({members: -1});
        if (!groups) return res.json({message: "No groups found."})
        return res.status(200).json({groups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

// home banner
const homeBanner = async (req, res) => {
    try {
        const groups = await db.Group.find({}).sort({members: -1}).limit(5);
        if (!groups) return res.json({message: "No groups found."})
        return res.status(200).json({groups})

    } catch (err) {
        console.log(err);
        res.error = err
    }
}

// Groiups part of
const profileGroup = async (req, res) => {
    try {
        const groups = await db.Group.find({members: {$in: req.params.id}}).sort({members: -1}).limit(5);
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

const show = async (req, res) => {
    try {
        const foundGroup = await db.Group.findById( req.params.id)
        const allPosts = await db.Post.find({group: req.params.id}).sort({createdAt: -1}).populate({path: "user", select: 'avatar firstName lastName'})
        
        return res.status(200).json({
            group: foundGroup,
            posts: allPosts,
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
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
    show,
    homeBanner,
    profileGroup
}