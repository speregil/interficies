/**
 * Controlador para manejar los servicios asociados con los grupos de participantes
 */

//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/group.service');     // Servicios asociados al manejo de grupos

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};    // Modulo del controlador a exportar

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.createGroup = function(groupName, masterName, callback) {
    service.createGroup(groupName, masterName, function(err, group){
        callback(err, group);
    });
}

module.exports = controller;