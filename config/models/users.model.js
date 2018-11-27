const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    pseudo: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

userSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
};

// Ici, user représente la table users
module.exports = mongoose.model('user', userSchema);
