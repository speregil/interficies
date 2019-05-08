var mongoose = require('mongoose');

var service = {};

// Conecta a una base MongoDB haciendo uso de Mongoose
service.connect = function(){
    mongoose.connect('mongodb://localhost/interficiesDB', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de conexion:'));

    db.once('open', function() {
         console.log("Conexion exitosa a Base de Datos");
    });

    return db;
}

// Elimina la conexión actual de mongoose
service.disconnect = function(){
    mongoose.disconnect();
}

module.exports = service;