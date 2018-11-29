const localStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    });
    passport.deserializeUser(function (user, done) {
        done(null, user)
    });

    passport.use(new localStrategy(function (pseudo, password, done) {
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
    }))
}