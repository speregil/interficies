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
    controller.register(req, function(err, user){
        if(err){
           res.status(500);
           res.json({status : 1, error : 'Error de registro: ' + err, data : {}}); 
        }
        res.json({status : 0, error : '', data : user});
    });
});

module.exports = router;