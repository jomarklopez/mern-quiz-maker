const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://jmlopez:mahesvara@react-quiz-ky0fy.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: false,
        useFindAndModify: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
