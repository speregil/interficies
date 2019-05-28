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
            callback(1, "El usuario no existe", null);
        else {
            Progress.find({userID: search._id}, function(err, search) {
                connection.disconnect();
                if(err)
                    callback(1, err['errmsg'], null);
                else {
                    if(search[0])
                        callback(0, null, search[0])
                    else {
                        callback(1, "El usuario no se ha registrado", null);
                    }
                }
            });
        }
    });
}

module.exports = service;