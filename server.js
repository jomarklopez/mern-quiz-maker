const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path");

// Set up express server 
const app = express()

// Set up the port to use with the env variables for Heroku or to use port 3000
const PORT = process.env.PORT || 3001

// Routes that connect to different resource endpoints
const userRouter = require('./routers/user')
const quizRouter = require('./routers/quiz')

// Connect mongoose to database 
// mongodb://127.0.0.1:27017/quiz-create-api
// mongodb+srv://jmlopez:mahesvara@react-quiz-ky0fy.mongodb.net/test?retryWrites=true&w=majority;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quiz-create-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected!!!')
})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    //app.use(express.static('client/build'));
    // add middleware
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
    
}

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