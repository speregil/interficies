/**
 * Enrutador principal para todos los componentes del portal
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

var express = require('express');
var controller = require('../controllers/main.controller');
var router = express.Router();

//--------------------------------------------------------------------------------------
// Enrutamientos
//--------------------------------------------------------------------------------------

router.get('/', function(req, res, next) {});

module.exports = router;