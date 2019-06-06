var connection = require('./connection.service');
var Progress = require('./models/progress.model');
var User = require('./models/user.model');
var Achivement = require('./models/achivement.model');

var service = {};

service.createProgressProfile = function(userID, callback) {
    var prof = new Progress();
    prof.userID = userID;
    prof.currentRol = "Ninguno";
    prof.level = "Iniciado";

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

service.getAchivements = function(user, callback) {
    connection.connect();
    var achivementList = [];
    var check = 0;
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos", []);
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    var achivements = profile[0].achivements;
                    for ( achivement of achivements ) {
                        check++;
                        Achivement.find({_id: achivement}, function(err, object) {
                            if(err)
                                callback ("No fue posible recuperar todos los logros", []);
                            else {
                                achivementList.push(object);
                                check--;
                            }
                        });
                        if(check <= 0)
                            callback(null, achivementList);
                    }
                });
            }
        }
    });
}

service.addAchivement = function (user, achivementID, callback) {
    connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                        if(err){
                            callback("No fue posible encontrar el perfil");
                        }else{
                            profile[0].achivements.push(achivementID);
                            profile[0].save(function(err, prof, ver){
                                if(err){
                                    callback("No fue posible asignar el logro");
                                }else{
                                    callback(null);
                                }
                            });
                        }
                });
            }
        }
    });
}

module.exports = service;