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

module.exports = controller;