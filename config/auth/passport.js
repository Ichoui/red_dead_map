const localStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');

const passport = require('passport');


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

