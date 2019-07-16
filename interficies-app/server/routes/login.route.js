/**
 * Enrutador para el API de Login de la aplicación
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

var express = require('express');                                   // Libreria base de express
var controller = require('../controllers/login.controller');        // Controlador del API                                

//--------------------------------------------------------------------------------------
// Enrutamientos
//--------------------------------------------------------------------------------------

var router = express.Router();      // Enrutador a exportar

/**
* Operación de registro de un nuevo usuario
* params: usuario, password, nombre a mostrar. Encriptados en el cuerpo
*/
router.post('/register', function(req, res, next) {
    controller.register(req, function(stat, msn, user){
        res.json({status : stat, mensaje : msn, data : user});
    });
});

/**
 * Operación para verificación de login y retorno de la info del usuario registrado
 * params: usuario, password. Encriptados en el cuerpo
 */
router.post('/login', function(req, res, next) {
    controller.login(req, function(err, isMatch, user){
        if(err)
            res.json({status : 1, mensaje : err, match : isMatch, userOb : null});
        else
            res.json({status : 0, mensaje: "Login exitoso", match: isMatch, data : user});
    });
});

router.post('/unregister', function(req, res, next){
    controller.unregister(req, function(err){
        if(err)
            res.json({status : 1, mensaje : err});
        else
            res.json({status : 0, mensaje: ""});
    });
});

/**
 * Operacion para obtener la lista de todos los participantes en BD
 */
router.get('/participantes', function(req, res, next) {
    controller.getParticipants(function(err, participants){
        res.json({mensaje: err, list: participants});
    });
});

module.exports = router;