/**
 * Enrutador para el API asociado con las notificaciones
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

 var express = require('express');                                   // Libreria base del Express
 var controller = require('../controllers/notification.controller');        // Controlador del API
 
 //--------------------------------------------------------------------------------------
 // Enrutamientos
 //--------------------------------------------------------------------------------------
 
 var router = express.Router();
 
 router.post('/new', function(req, res, next) {
     controller.addNotification(req.body.username, req.body.mensaje, function(err){
        res.json({mensaje : err});
     });
 });

 router.get('/list/:username', function(req, res, next){
    controller.getNotifications(req.params.username, function(err, notifications){
        res.json({mensaje: err, list: notifications});
    });
 });

 module.exports = router;