/**
 * Servicio para la conexión con MongoDB usando la libreria Mongoose
 */

 //------------------------------------------------------------------------------------------
 // Requerimientos
 //------------------------------------------------------------------------------------------

var mongoose = require('mongoose');   // Libreria Mongoose

//-------------------------------------------------------------------------------------------
// Servicio
//-------------------------------------------------------------------------------------------

var service = {};

/**
 * Conecta a una base MongoDB haciendo uso de Mongoose
*/
service.connect = function(){
    mongoose.connect('mongodb://localhost/interficiesDB', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de conexion:'));

    db.once('open', function() {});

    return db;
}

/**
 * Elimina la conexión actual de mongoose
 */
service.disconnect = function( db ){
    db.close();
}

module.exports = service;