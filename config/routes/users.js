const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users.model');

router.post('/login', function(req, res, next) {
    res.render('index');
});

router.post('/signup', function(req, res, next) {
    const user = new User
});

module.exports = router;