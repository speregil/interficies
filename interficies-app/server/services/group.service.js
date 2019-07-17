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
                connection.disconnect();
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

 service.getGroups = function(masterName, callback){
    connection.connect();
    User.find({username: masterName, admin: true}, function(err, master){
        if(err)
            callback("Error en la base de datos", []);
        else if(master[0]){
            Group.find({master: master[0]._id}, function(err, list){
                if(err)
                    callback(err, []);
                else
                    callback(null, list);
            });
        }
        else
            callback("Error: El maestro no existe", []);
    });
 }

 service.asign = function(groupName, userName, callback){
    connection.connect();
    Group.find({name: groupName}, function(err, group){
        if(err)
            callback("Error en la base de datos");
        else if(group[0]){
            User.find({username: userName}, function(err, user){
                if(err)
                    callback("Error en la base de datos");
                else if(user[0]){
                    group[0].participants.push(user[0]._id);
                    group[0].save(function(err, gr, ver){
                        connection.disconnect();
                        if(err){
                            callback("No fue asignar al participantes");
                        }else{
                            callback(null);
                        }
                    });
                }
                else
                    callback("Error: El usuario no existe");
            });
        }
        else
            callback("Error: El grupo no existe");
    });
 }
 
 module.exports = service;