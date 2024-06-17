const jwt = require('jsonwebtoken')
const JWT_SECRET = 'habit-tracker-jwt-sssecret'

function authMiddleware (req, res, next) {
    console.log('req.cookies = ', req.cookies)
    const token = req.cookies.habitTrackerToken
    console.log('token = ', token)
    if (!token || token === 'null' || token === 'undefined') {
        console.log('no token, sending 401 response')
        return res.status(401).json({ message: 'You must be logged in to do that' })
    }
    try {
        let user = verifyToken(token)
        user = user.toObject()
        delete user.salt
        delete user.password
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'You must be logged in to do that' })
    }
}

function signToken (user) {
    const payload = { id: user._id, email: user.email, name: user.name }
    const expires = { expiresIn: '2h' }
    return jwt.sign(payload, JWT_SECRET, expires)
}

function verifyToken (token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { signToken, verifyToken, authMiddleware }