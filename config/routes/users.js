var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
    res.render('index');
});

router.post('/signup', function(req, res, next) {
    res.render('index');
});

module.exports = router;