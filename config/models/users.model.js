const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    pseudo: String,
    mail: String,
    password: String
});

// Ici, user représente la table users
module.exports = mongoose.model('user', userSchema);
