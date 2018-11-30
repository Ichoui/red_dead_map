const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const passport = require('passport');


router.post('/signup', function (req, res) {
    const body = req.body,
        email = body.email,
        pseudo = body.pseudo,
        password = body.password;
    User.findOne({
        pseudo: pseudo
    }, function (err, doc) {
        if (err) {
            res.status(500).send(json({error: err, message: "error occured"}))
        } else {
            if (doc) {
                res.status(500).send('Ce pseudo existe')
            } else {
                const user = new User();
                user.pseudo = pseudo;
                user.email = email;
                user.password = user.hashPassword(password);
                user.save()
                    .then(function (user, err) {
                        if (err) {
                            res.status(500).send('db error')
                        } else {
                            res.redirect('/')
                        }
                    })
            }
        }
    })
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/map',
    failureRedirect: '/fuck-yourself',
    failureFlash: true
}));

module.exports = router;