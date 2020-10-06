const express = require('express')
const Quiz = require('../models/quiz')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create quiz
router.post('/quiz', auth, async (req, res) => {

    const quiz = new Quiz({
        ...req.body,
        user: req.user._id
    })
    try {

        await quiz.save()

        res.status(201).send(quiz)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all quizzes of user
router.get('/quiz', auth, async (req, res) => {
    try {

        await req.user.populate({
            path: 'quizzes'
        }).execPopulate()

        res.status(200).send(req.user.quizzes)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get individual quiz of user
router.get('/quiz/:quizId', auth, async (req, res) => {
    const _id = req.params.quizId

    try {
        const quiz = await Quiz.findOne({ _id, user: req.user._id })

        if (!quiz) {
            return res.status(404).send()
        }

        res.status(200).send(quiz)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update quiz 
router.patch('/quiz/:quizId', auth, async (req, res) => {
    // Verify that the user intends to update existing fields

    let { quizName, items } = req.body;
    const updates = Object.keys({ quizName, items })
    const allowedUpdates = ['quizName', 'items']

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    const _id = req.params.quizId

    if (!isValidUpdate) {
        return res.status(400).send('Error: Invalid update!')
    }

    // Verify and updating the task
    try {
        const quiz = await Quiz.findOne({ _id, user: req.user._id })

        updates.forEach(update => quiz[update] = req.body[update])
        await quiz.save()

        if (!quiz) {
            res.status(404).send()
        }
        res.send(quiz)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete quiz of user
router.delete('/quiz/:quizId', auth, async (req, res) => {
    const _id = req.params.quizId

    try {
        const quiz = await Quiz.findOneAndDelete({ _id, user: req.user._id })

        if (!quiz) {
            res.status(404).send('Quiz not found!')
        }

        res.send(quiz)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router