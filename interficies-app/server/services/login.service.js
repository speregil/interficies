var connection = require('./connection.service');
var bcrypt = require('bcrypt');
var User = require('./models/user.model');
var Progress = require('./progress.service');

var service = {};

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