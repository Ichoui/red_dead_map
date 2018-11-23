const http = require('http');
const app = require('./app');

const hostname = 'localhost';
const port = 8700;

app.listen(port, hostname, function () {
    if (hostname === 'localhost') {
        console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
    } else {
        console.log("Mon serveur fonctionne sur http://" + hostname);
    }
});
