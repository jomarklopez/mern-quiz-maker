const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        // Get token from the request header
        const token = req.header('Authorization').replace('Bearer ', '')
        // Decode the extracted token
        const decoded = jwt.verify(token, 'secret')
        // Find if a user exists with the id and token provided
        const user = await User.findOne(
            {
                _id: decoded._id,
                'tokens.token': token
            })
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth