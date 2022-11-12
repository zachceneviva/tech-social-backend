// imports
require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const routes = require('./routes')
const aws = require('aws-sdk')


//Constants
const port = process.env.PORT || 4000;
const app =  express()

// CORS - Middleware
app.use(cors())

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID_ENV,
  secretAccessKey: process.env.AWS_SECRET_KEY_ENV,
})

//JSON parsing - Middleware
app.use(express.json())

// API Route - Middleware
app.use('/api/v1/techonnect/posts', routes.posts)
app.use('/api/v1/techonnect/comments', routes.comments)
app.use('/api/v1/techonnect/users', routes.users)
app.use('/api/v1/techonnect/groups', routes.groups)
app.use('/api/v1/techonnect/meetups', routes.meetups)
app.use('/api/v1/techonnect/conversations', routes.conversations)
app.use('/api/v1/techonnect/messages', routes.messages)


app.listen(port, () => console.log(`Server is running on port ${port}.`))