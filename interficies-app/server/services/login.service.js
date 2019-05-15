var mongoose = require('mongoose');
var connection = require('./connection.service');
var bcrypt = require('bcrypt');
var User = require('./models/user.model');

var service = {};

service.register = function(username, password, callback){
    var db = connection.connect();
    var user = new User();
    bcrypt.hash(password, 10, function(err, hash) {
        user.username = username;
        user.password = hash;

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
        bcrypt.compare(password, search[0].password, function(err, res) {
            if(res)
                callback(null, true);          
            else
                callback("Login incorrecto", false);
        });
    });  
}

module.exports = service;