const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    id_: mongoose.Schema.Types.ObjectId,
    pseudo: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true}
});

// Ici, user représente la table users
module.exports = mongoose.model('User', userSchema);
