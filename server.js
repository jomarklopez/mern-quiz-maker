const express = require('express')
const cors = require('cors')
const path = require('path')

// Connect mongoose to database by running the file
require('./db/mongoose')

// Routes that connect to different resource endpoints
const userRouter = require('./routers/user')
const quizRouter = require('./routers/quiz')

// Set up express server 
const app = express()

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Set up the port to use with the env variables for Heroku or to use port 3000
const PORT = process.env.PORT || 3000

// cors
app.use(cors({ origin: true, credentials: true }))

// Receive request from JSON to Objects
app.use(express.json())

// Telling express to use the following routers
app.use(userRouter)
app.use(quizRouter)

// Set server to use port 3000
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});