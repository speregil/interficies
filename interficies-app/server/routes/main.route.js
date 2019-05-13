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

module.exports = router;