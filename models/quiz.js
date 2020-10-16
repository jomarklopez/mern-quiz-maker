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
        optionType: {
            type: String,
            required: true
        },
        answers: [{
            type: String,
            required: true
        }],
        options: [{
            type: String,
            required: true
        }],
        notes: {
            type: String,
            required: false
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Quiz = new mongoose.model('Quiz', quizSchema)

module.exports = Quiz