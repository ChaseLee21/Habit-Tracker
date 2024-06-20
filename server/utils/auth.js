const jwt = require('jsonwebtoken')
const JWT_SECRET = 'habit-tracker-jwt-sssecret'

function authMiddleware (req, res, next) {
    const token = req.cookies.habitTrackerToken
    if (!token || token === 'null' || token === 'undefined') {
        console.log('no token, sending 401 response')
        return res.status(401).json({ message: 'You must be logged in to do that' })
    }
    try {
        const user = verifyToken(token)
        delete user.salt
        delete user.password
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Your session has expired. Please log in again.' })
        }
        res.status(401).json({ message: 'You must be logged in to do that' })
    }
}

function signToken (user) {
    const payload = { id: user._id, email: user.email, name: user.name, timezone: user.timezone }
    const expires = { expiresIn: '2h' }
    return jwt.sign(payload, JWT_SECRET, expires)
}

function verifyToken (token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { signToken, verifyToken, authMiddleware }
