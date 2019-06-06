/**
 * Enrutador principal para todos los componentes del portal
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

var express = require('express');
var controller = require('../controllers/progress.controller');
var router = express.Router();

//--------------------------------------------------------------------------------------
// Enrutamientos
//--------------------------------------------------------------------------------------

router.get('/:username', function(req, res, next) {
    controller.getProgress(req.params.username, function(status, err, prog){
        if(status > 0)
            res.json({status : 1, mensaje : err, progOb : null});
        else
            res.json({status : 0, mensaje: "", progOb : prog});
    });
});

router.post('/achivement', function(req, res, next) {
    controller.addAchivement(req, function (err) {
        if(err)
            res.json({status : 1, mensaje : err});
        else
            res.json({status : 0, mensaje : ""});
    });
});

module.exports = router;