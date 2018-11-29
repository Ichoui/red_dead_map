const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users.model');

router.post('/login', function (req, res, next) {
    User.find({pseudo: req.body.pseudo})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({message: 'Auth failed'})
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, process.env.JWT_TOKEN,
                        {
                            expiresIn: "1h"
                        }
                    );
                    // res.status(200).json({message: 'Auth successful', token: token})
                    res.redirect('/');
                    next();
                } else {
                    res.status(401).json({message: 'Auth failed'})
                }
                if (result) {
                    console.log('ee???')
                    res.render('index', {test:'testr'});
                }
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


// terminer cette video
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
                    /*                    res.status(201).json({
                                            message: 'User created !',
                                            user: result
                                        });*/
                    res.redirect('/');
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