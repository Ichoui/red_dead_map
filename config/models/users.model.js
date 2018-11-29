const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    id_: mongoose.Schema.Types.ObjectId,
    pseudo: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password,hash) {
    return bcrypt.compareSync(password,hash)
}

// Ici, user représente la table users
module.exports = mongoose.model('User', userSchema);
