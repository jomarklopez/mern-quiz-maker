const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')



// Creating a user
router.post('/users', async (req, res, next) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        return next(e)
    }
}, (error, req, res, next) => {
    if (error.code == 11000) {
        res.status(409).send({ error: 'Email is already in use, please use a different email or retrieve your password by clicking forgot password' })
    }
})

// Login user
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        // Remove user token from tokens session array
        req.user.tokens = req.user.tokens.filter(tokenObject => {
            return tokenObject.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Logout all user session
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Read user account 
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Edit user account
router.patch('/users/me', auth, async (req, res) => {
    // Check if user intends to update existing fields
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    isValidOperation = updates.every(update => allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        return res.status(400).send('Error: Invalid Update!')
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete user account
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router