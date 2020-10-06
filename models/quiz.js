const mongoose = require('mongoose')

// Since there will be a need for the quiz to standalone, implementation of a one-to-many schema design will be needed to allow easier search and updates of each quizzes.
const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    items: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }]
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Quiz = new mongoose.model('Quiz', quizSchema)

module.exports = Quiz