const express = require('express');
const router = express.Router();

const loggedIn = function (req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next()
    } else {
        res.redirect('/')
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index')
});

// loggedIn to add after the Path
router.get('/map', function (req, res, next) {
    res.render('map', {user: req.user})
});



module.exports = router;