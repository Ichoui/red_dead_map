const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users.model');

router.post('/login', function (req, res, next) {
    res.render('index');
});

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'User created !',
                        user: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })
});

module.exports = router;