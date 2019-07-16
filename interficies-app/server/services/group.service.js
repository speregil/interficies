/**
 * Servicio para manejar el regtistro y login de usarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var connection = require('./connection.service');       // Servicio de conexión con Mongo
 var User = require('./models/user.model');              // Modelo del usuario
 var Group = require('./models/group.model')             // Modelo del grupo
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 service.createGroup = function(groupName, masterName, callback){
    connection.connect();
    var group = new Group();
    group.name = groupName;
    User.find({username: masterName}, function(err, search){
        if(err)
            callback("Error en la base de datos", null);
        else if(search[0]){
            group.master = search[0]._id;
            group.participants = new Array();
            group.save(function(err, data, ver){
                if(err){
                    callback(err['errmsg'], null);
                }
                else{
                    callback(null, data);
                }
            });
        }
        else
            callback("El maestro indicado no existe", null);
    });
 }
 
 module.exports = service;