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
        console.log(err);
        res.json({mensaje : err});
     });
 });

 module.exports = router;