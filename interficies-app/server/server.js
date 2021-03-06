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

var login = require('./routes/login.route');                    // API para el manejo de login y la información del usuario
var progress = require('./routes/progress.route');              // API para el manejo del progreso en la experienciade un usuario
var group = require('./routes/group.route');                    // API para la administración de grupos
var challenge = require('./routes/challenge.route');            // API para la asignación de retos a un usuario
var notification = require('./routes/notification.route');      // API para la administración de notificaciones de un usuario

//---------------------------------------------------------------------------------------
// Servidor
//---------------------------------------------------------------------------------------

var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/progress', progress);
app.use('/groups', group);
app.use('/challenges', challenge);
app.use('/notifications', notification);

// Maneja el error 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
var server = app.listen(3100, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Servidor corriendo en http://%s:%s', host, port);
});
 
module.exports = app;