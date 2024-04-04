const { Schema, model } = require('mongoose');
const crypto = require('crypto');

//TODO - add logic that checks if id and salt were passed in the request
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false},
    habits: { type: Array, required: true },
    salt: { type: String, required: false, select: false}
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

userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();

    // Check if $set exists and password is being updated
    if (!update.$set || !update.$set.password) {
        return next();
    }

    try {
        const password = update.$set.password;
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, hash) => {
            if (err) {
                return next(err);
            }

            update.$set.password = hash.toString('hex');
            update.$set.salt = salt;
            next();
        });

    } catch (err) {
        return next(err);
    }
});

module.exports = model('User', userSchema);