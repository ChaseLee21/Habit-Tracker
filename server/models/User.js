const { Schema, model } = require('mongoose');
const crypto = require('crypto');

const userSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    habits: { type: Array, required: true },
    salt: { type: String, required: true }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    // Generate a salt
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hash the password
    crypto.pbkdf2(this.password, this.salt, 1000, 64, 'sha512', (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash.toString('hex');
        next();
    });
});

module.exports = model('User', userSchema);