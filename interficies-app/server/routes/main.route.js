/**
 * Enrutador principal para todos los componentes del portal
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

var express = require('express');
var controller = require('../controllers/login.controller');
var router = express.Router();

//--------------------------------------------------------------------------------------
// Enrutamientos
//--------------------------------------------------------------------------------------

router.post('/register', function(req, res, next) {
    controller.register(req, function(stat, msn, user){
        res.json({status : stat, mensaje : msn, data : user});
    });
});

router.post('/login', function(req, res, next) {
    controller.login(req, function(err, isMatch){
        if(err)
            res.json({status : 1, mensaje : err, match : isMatch});
        else
            res.json({status : 0, mensaje: "Login exitoso", match: isMatch});
    });
});

module.exports = router;