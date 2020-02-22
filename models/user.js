const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate: value => {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cannot be 'password'")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('quizzes', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'user'
})

// Generate auth token for each user session
userSchema.methods.generateAuthToken = async function () {
    const user = this

    // Generate token with jsonwebtoken
    const token = jwt.sign({ _id: user._id.toString() }, 'secret')
    // Insert token to token array of user
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// When coverting JSON to Object using stringify, we can modify which can modify the object to be returned
userSchema.methods.toJSON = function () {
    const user = this
    const userPublicObject = user.toObject()

    delete userPublicObject.password

    return userPublicObject
}

// Middleware to hash user password when saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Check if there is an existing user when logging in
userSchema.statics.findByCredentials = async (email, password) => {

    // Check if email exists in database
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login. Check you email and password')
    }

    // If email exists, check if password matches stored password in database
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Unable to login. Check you email and password')
    }

    return user
}

const User = new mongoose.model('User', userSchema)

module.exports = User