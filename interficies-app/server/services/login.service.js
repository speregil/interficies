/**
 * Servicio para manejar el regtistro y login de usarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

var connection = require('./connection.service');   // Servicio de conexión con Mongo
var bcrypt = require('bcrypt');                     // Libreria de encriptamiento
var User = require('./models/user.model');          // Modelo del usuario
var Progress = require('./progress.service');       // Modelo del progreso

//-----------------------------------------------------------------------------------------------------
// Servicio
//-----------------------------------------------------------------------------------------------------

var service = {};

/**
 * Registra un nuevo usuario en la base de datos
 * username Nombre unico del usuario
 * password Clave en texto plano del nuevo usuario
 * shownName Nombre del usuario que se muestra en la aplicación
 */
service.register = function(username, password, shownName, callback){
    connection.connect();
    var user = new User();
    bcrypt.hash(password, 10, function(err, hash) {
        user.username = username;
        user.password = hash;
        user.shownName = shownName;

        user.save(function(err, user, ver){
            if(err){
                callback(1, err['errmsg'], user);
            }
            else{
                Progress.createProgressProfile(user._id, function(status, err, prof){
                    connection.disconnect();
                    if(status > 0)
                        callback(1, err, user);
                    else
                        callback(0, null, user);
                });
            }
        });


    });
}

/**
 * Verifica que el usuario con el user y password provistos esta registrado y retorna un objeto con todos sus datos
 * user Nombre de usuario a revisar
 * password Clave asiciada al usuario a revisar
 */
service.login = function(user, password, callback){
    connection.connect();
    User.find({username: user}, function(err, search){
        connection.disconnect();
        if(search[0]){
            bcrypt.compare(password, search[0].password, function(err, res) {
                if(res)
                    callback(null, true, search[0]);          
                else
                    callback("Login incorrecto", false, null);
            });
        }
        else{
            callback("El usuario no existe", false, null);
        }
    });  
}

module.exports = service;