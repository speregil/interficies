var mongoose = require('mongoose');
var connection = require('./connection.service');
var User = require('./models/user.model');

var service = {};

service.register = function(username, password, callback){
    var db = connection.connect();
    var user = new User();
    user.username = username;
    user.password = password;

    user.save(function(err, user, ver){
        connection.disconnect();
        if(err){
            callback(1, err['errmsg'], user);
        }
        else
            callback(0, "Registro exitoso", user);
    });
}

module.exports = service;