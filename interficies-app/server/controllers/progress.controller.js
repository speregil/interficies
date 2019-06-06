//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/progress.service');
var User = require('../services/models/user.model');

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.getProgress = function(user, callback) {
    service.getProfile(user, function(status, error, prog) {
        if(status > 0)
            callback(1, "No fue posible recuperar el perfil: " + error, null );
        else {
            callback(0, null, prog);
        }
    });
}

controller.addAchivement = function(req, callback) {
    service.addAchivement(req.body.user, req.body.achivementID, function (err){
        callback(err);
    });
}

controller.getAchivements = function(user, callback) {
    service.getAchivements (user, function (err, achivements){
        callback(err, achivements);
    });
}

module.exports = controller;