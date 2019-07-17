/**
 * Enrutador para el API asociado con los grupos de participantes
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

 var express = require('express');                                   // Libreria base del Express
 var controller = require('../controllers/group.controller');        // Controlador del API
 
 //--------------------------------------------------------------------------------------
 // Enrutamientos
 //--------------------------------------------------------------------------------------
 
 var router = express.Router();
 
 router.post('/new', function(req, res, next) {
     controller.createGroup(req.body.group, req.body.master, function(err, resp){
        res.json({mensaje : err, group : resp});
     });
 });

 router.post('/asign', function(req, res, next) {
    controller.asign(req.body.groupName, req.body.userName, function(err){
       res.json({mensaje : err});
    });
});

router.get('/list/:mastername', function(req, res, next) {
   controller.getGroups(req.params.mastername, function(err, groups){
      res.json({mensaje : err, list: groups});
   });
});

 module.exports = router;