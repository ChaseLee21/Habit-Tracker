const jwt = require('jsonwebtoken');
const JWT_SECRET = 'habit-tracker-jwt-sssecret';

function signToken (user) {
    const payload = { id: user._id, email: user.email, name: user.name };
    const expires = { expiresIn: '2h' };
    return jwt.sign(payload, JWT_SECRET, expires);
}

function verifyToken (token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken };