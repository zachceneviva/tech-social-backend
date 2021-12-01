const db = require('../models');

const index = async (req, res) => {
    try {
        const meetups = await db.Meetup.find({}).sort({date: 1});
        if (!meetups) return res.json({message: "No meetups found."})
        return res.status(200).json({meetups})

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
    
    try {
        const newMeetup = {...req.body, photo}
        const meetup = await db.Meetup.create(newMeetup)
        console.log(meetup)
        return res.status(201).json({meetup})
    } catch (err) {
        console.log(err)
    }
}

const show = async (req, res) => {
    try {
        const foundMeetup = await db.Meetup.findById(req.params.id).populate({path: "creator", select: 'avatar firstName lastName'})
        console.log(foundMeetup)
        return res.status(200).json({
            meetup: foundMeetup,
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occured. Please try again."
        })
    }
}

const update = (req, res) => {
    db.Meetup.findByIdAndUpdate(req.params.id, {...req.body}, {new:true},
    (error, updatedMeetup) => {
        console.log(updatedMeetup)
        if (error) console.log('There was a error updating the meetup.')
        return res.status(200).json({updatedMeetup})
    })
}

const destroy = async (req, res) => {
    try {
        await db.Meetup.findByIdAndDelete(req.params.id)
        
        console.log("Meetup deleted")
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
}