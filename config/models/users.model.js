const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id_: mongoose.Schema.Types.ObjectId,
    pseudo: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// Ici, user représente la table users
module.exports = mongoose.model('User', userSchema);
