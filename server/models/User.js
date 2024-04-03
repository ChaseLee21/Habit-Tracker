const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    habits: { type: Array, required: true }
});

// TODO: Add a method to the schema to hash the password before saving it to the database

module.exports = model('User', userSchema);