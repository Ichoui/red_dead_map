const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'images'))); // donne le droit d'accès au dossier au dossier images (pour les images de l'api)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accepte, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//VIEW ENGINE
app.set('view engine', 'ejs'); //préchargement engine
app.set('views', path.join(__dirname, '/public/')); // changement du dossier views

//  ACCES AUX PATHS API & Index
app.use(express.static(path.join(__dirname, 'public/'))); // donne les droits d'accès au dossier public (pour les resources)
app.get('/', function (req, res) {
    res.render('index');
});


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
