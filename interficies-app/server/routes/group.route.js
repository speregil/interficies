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

 router.post('/remove', function(req, res, next) {
   controller.removeGroup(req.body.group, req.body.master, function(err, resp){
      res.json({mensaje : err});
   });
});

 router.post('/asign', function(req, res, next) {
    controller.asign(req.body.groupName, req.body.userName, function(err){
       res.json({mensaje : err});
    });
});

router.post('/unasign', function(req, res, next) {
   controller.unasign(req.body.groupName, req.body.userName, function(err){
      res.json({mensaje : err});
   });
});

router.get('/list/:mastername', function(req, res, next) {
   controller.getGroups(req.params.mastername, function(err, groups){
      res.json({mensaje : err, list: groups});
   });
});

router.get('/participants/:groupname', function(req, res, next) {
   controller.getParticipants(req.params.groupname, function(err, participants){
      res.json({mensaje : err, list: participants});
   });
});

 module.exports = router;