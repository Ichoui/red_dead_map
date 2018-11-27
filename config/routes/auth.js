var express = require('express');
var router = express.Router();
var User = require('../models/users.model');

module.exports = function (passport) {
    router.post('/signup', function (req, res) {
        var body = req.body,
            pseudo = body.pseudo,
            password = body.password,
            mail = body.mail,
            password = body.password;
        User.findOne({pseudo: pseudo}, function (err, doc) {
            if (err) {
                res.status(500).send('Cet utilisateur n\'existe pas')
            } else {
                if (doc) {
                    res.status(500).send('Cet utilisateur existe déjà !')
                } else {
                    var record = new User();
                    record.pseudo = pseudo;
                    record.mail = mail;
                    record.password = record.hasPassword(password);
                    record.save(function(err,user){
                        if(err){
                            res.status(500).send('db error')
                        } else {
                            res.send(user)
                        }
                    })
                }
            }
        })
    });
    return router;
};