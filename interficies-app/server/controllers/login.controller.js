//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/login.service');

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.register = function(req, callback){
    service.register(req.body.user, req.body.password, req.body.shownName, function(stat, msn, user){
        callback(stat, msn, user);
    });
}

controller.login = function(req, callback){
    service.login(req.body.user, req.body.password, function(err, isMatch, user){
        callback(err, isMatch, user);
    });
}

module.exports = controller;