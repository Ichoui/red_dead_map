const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();


//Configure Mongoose
const urlMongoose = 'mongodb+srv://' + process.env.MONGO_ATLAS_USER + ':' + process.env.MONGO_ATLAS_PW +
    '@cluster0-rcqfl.mongodb.net/' + process.env.MONGO_DATABASE + '?retryWrites=true';

mongoose.connect(urlMongoose, {useNewUrlParser: true})
    .then(e => console.log('State : Connected to database!'))
    .catch(err => console.log('State : Cant\'t connect to Database : ', err));
mongoose.Promise = global.Promise;

//VIEW ENGINE
app.set('view engine', 'ejs'); //préchargement engine
app.set('views', path.join(__dirname, '/public/')); // changement du dossier views

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accepte, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//  ACCES AUX PATHS API & Index
app.use(express.static(path.join(__dirname, 'public/'))); // donne les droits d'accès au dossier public (pour les resources)
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/map', function (req, res) {
    res.render('map');
});

const usersRoute = require('./config/auth/users');
app.use('/users/', usersRoute);

// GESTION DES ERREURS
app.use((req, res, next) => {
    const error = new Error('Not Found !');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
