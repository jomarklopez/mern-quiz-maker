const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

// Connect mongoose to database
const MongoClient = require("mongodb").MongoClient;
const client = await new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
client.connect();
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

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
const PORT = process.env.PORT || 3001

// cors
app.use(cors({ origin: true, credentials: true }))

// Receive request from JSON to Objects
app.use(express.json())

// Telling express to use the following routers
app.use(userRouter)
app.use(quizRouter)

// Set server to use port 3001
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});