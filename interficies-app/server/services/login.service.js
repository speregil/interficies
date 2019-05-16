var mongoose = require('mongoose');
var connection = require('./connection.service');
var bcrypt = require('bcrypt');
var User = require('./models/user.model');

var service = {};

service.register = function(username, password, shownName, callback){
    var db = connection.connect();
    var user = new User();
    bcrypt.hash(password, 10, function(err, hash) {
        user.username = username;
        user.password = hash;
        user.shownName = shownName;

        user.save(function(err, user, ver){
            connection.disconnect();
            if(err){
                callback(1, err['errmsg'], user);
            }
            else
                callback(0, "Registro exitoso", user);
        });
    });
}

service.login = function(user, password, callback){
    connection.connect();
    User.find({username: user}, function(err, search){
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