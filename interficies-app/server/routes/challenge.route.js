/**
 * Enrutador para el API asociado con los retos de participantes
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

 var express = require('express');                                   // Libreria base del Express
 var controller = require('../controllers/challenge.controller');
 var master = require('../controllers/masterChal.controller');         // Controlador del API
 
 //--------------------------------------------------------------------------------------
 // Enrutamientos
 //--------------------------------------------------------------------------------------
 
 var router = express.Router();
 
 router.post('/add', function(req, res, next) {
     controller.addChallenge(req.body.user, req.body.type, req.body.text, function(err){
        res.json({mensaje : err });
     });
 });

 router.post('/create', function(req, res, next) {
    master.createChallenge(req.body.master, req.body.type, req.body.text, function(err){
       res.json({mensaje : err });
    });
});

router.post('/grade', function(req, res, next){
    controller.gradeChallenge(req.body.id, req.body.points, function(err){
        res.json({mensaje : err});
    });
});

 router.get('/list/:user', function(req, res, next) {
    controller.getChallenges(req.params.user, function(err, challenges){
        res.json({mensaje : err, list : challenges});
    });
});

router.get('/master/list/:type', function(req, res, next) {
    master.getChallenges(req.params.type, function(err, challenges){
        res.json({mensaje : err, list : challenges});
    });
});

 module.exports = router;