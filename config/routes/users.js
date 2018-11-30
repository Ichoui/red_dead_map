const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;




passport.use('login', new localStrategy({
    passReqToCallback: true
}, function (req,pseudo, password, done) {
    console.log(req);
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    User.findOne({
        pseudo: pseudo
    }, function (err, doc) {
        if (err) {
            done(err)
        } else {
            if (doc) {
                const valid = doc.comparePassword(password, doc.password);
                if (valid) {
                    // do not add password hash to session
                    done(null, {
                        username: doc.username,
                        id: doc._id
                    })
                } else {
                    done(null, false)
                }
            } else {
                done(null, false)
            }
        }
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (user, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    });
});

/////////////////////// below was in passport.js

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