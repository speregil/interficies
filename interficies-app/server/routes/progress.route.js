/**
 * Enrutador para el API asociado con los datos de progreso del juego
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

var express = require('express');                                   // Libreria base del Express
var controller = require('../controllers/progress.controller');     // Controlador del API

//--------------------------------------------------------------------------------------
// Enrutamientos
//--------------------------------------------------------------------------------------

var router = express.Router();

/**
 * Retorna un objeto con toda la información del progreso del usuario cuyo username entra por parametro
 */
router.get('/profile/:username', function(req, res, next) {
    controller.getProgress(req.params.username, function(status, err, prog){
        if(status > 0)
            res.json({status : 1, mensaje : err, progOb : null});
        else
            res.json({status : 0, mensaje: "", progOb : prog});
    });
});

/**
 * Retorna una lista con todos los logros registrados en la base de datos
 */
router.get('/list', function(req, res, next){
    controller.getAchivementList(function(err, achivements){
        if(err)
            res.json({status : 1, mensaje : err, list : []});
        else
            res.json({status : 0, mensaje: "", list : achivements});
    });
});

/**
 * Returna una lista de objetos con la información de todos los logros conseguidos por el usuario cuyo
 * username entra por parametro
 */
router.get('/achivements/:username', function(req, res, next) {
    controller.getAchivements(req.params.username, function(err, achivements){
        if(err)
            res.json({status : 1, mensaje : err, list : []});
        else
            res.json({status : 0, mensaje: "", list : achivements});
    });
});

/**
 * Asigna un nuevo logro de la base de datos al usuario
 * params: username, achivementID. Encriptados en el cuerpo
 */
router.post('/achivement', function(req, res, next) {
    controller.addAchivement(req.body.user, req.body.achivementID, function (err) {
        if(err)
            res.json({status : 1, mensaje : err});
        else
            res.json({status : 0, mensaje : ""});
    });
});

/**
 * Actualiza el rol de un usuario.
 * params: user, role. Encriptados en el cuerpo
 */
router.post('/role', function(req, res, next) {
    controller.updateRole(req.body.user, req.body.role, function (err){
        if(err)
            res.json({status : 1, mensaje : err});
        else
            res.json({status : 0, mensaje : ""});
    });
});

router.post('/avatar', function(req, res, next) {
    controller.updateAvatar(req.body.username, req.body.avatar, function (err){
        res.json({mensaje : err});
    });
});

/**
 * Activa la bandera de progreso que entra por parametro al usuario específicado
 * params: user, flag. Encriptados en el cuerpo
 */
router.post('/save', function(req, res, next) {
    controller.activateFlag(req.body.user, req.body.flag, function (err){
        if(err)
            res.json({status : 1, mensaje : err});
        else
            res.json({status : 0, mensaje : ""});
    });
});

module.exports = router;