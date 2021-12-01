// imports
const express = require('express')
const cors = require ('cors')
const routes = require('./routes')


//Constants
const port = process.env.PORT || 4000;
const app =  express()

// CORS - Middleware
app.use(cors())

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