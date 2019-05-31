var connection = require('./connection.service');
var Progress = require('./models/progress.model');
var User = require('./models/user.model');

var service = {};

service.createProgressProfile = function(userID, callback) {
    var prof = new Progress();
    prof.userID = userID;
    prof.currentRol = "Ninguno";
    prof.level = "Iniciado";
    prof.points = 0;

    connection.connect();
    prof.save(function(err, prof, ver){
        connection.disconnect();
        if(err){
            callback(1, err['errmsg'], prof);
        }
        else
            callback(0, "", prof);
    });
}

service.getProfile = function(user, callback) {
    connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback(1, "Error en la base de datos", null);
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    connection.disconnect();
                    if(err)
                        callback(1, err['errmsg'], null);
                    else {
                        if(profile[0])
                            callback(0, null, profile[0])
                        else {
                            callback(1, "El usuario no se ha registrado", null);
                        }
                    }
                });
            }
            else {
                callback(1, "El usuario no existe", null);
            }
        }
    });
}

module.exports = service;