﻿/**
 * Configuración básica del servidor que expone el API que soporta el portal interficies
 */

//--------------------------------------------------------------------------------------
// Requerimientos
//--------------------------------------------------------------------------------------

var express = require('express');              // Libreria base de express
var path = require('path');                    // Libreria para manerjar el enrutamiento
var bodyParser = require('body-parser');       // Libreria para manejar la lectura del cuerpo de una respuesta REST
var cors = require('cors');                    // Libreria para manejar el protocolo CORS

//---------------------------------------------------------------------------------------
// Rutas
//---------------------------------------------------------------------------------------

var main = require('./routes/main.route');

//---------------------------------------------------------------------------------------
// Servidor
//---------------------------------------------------------------------------------------

var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main);

// Maneja el error 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Servidor corriendo en http://%s:%s', host, port);
});
 
module.exports = app;