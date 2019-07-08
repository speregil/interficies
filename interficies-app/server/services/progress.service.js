/**
 * Servicio para manejar el progreso en el juego del usuario
 */

 //------------------------------------------------------------------------------------------
 // Requerimientos
 //------------------------------------------------------------------------------------------

var connection = require('./connection.service');        // Conexión con la base de datos
var Progress = require('./models/progress.model');       // Modelo del progreso
var User = require('./models/user.model');               // Modelo del usuario
var Achivement = require('./models/achivement.model');   // Modelo del logro

//-------------------------------------------------------------------------------------------
// Servicio
//-------------------------------------------------------------------------------------------

var service = {};

/**
 * Crea un nuevo modelo de progreso aasociado al usuario cuyo ID entra por parametro
 * userID ID en al base de datos del usuario al que se le va asociar el perfil de progreso
 */
service.createProgressProfile = function(userID, callback) {
    var prof = new Progress();
    prof.userID = userID;
    prof.currentRol = "Ninguno";
    prof.level = "Iniciado";
    prof.achivements = [];
    prof.j = false;
    prof.r= false;
    prof.d= false;
    prof.f= false;
    prof.i= false;
    prof.l= false;

    connection.connect();
    prof.save(function(err, prof, ver){
        connection.disconnect();
        if(err){
            callback(1, err['errmsg'], prof);
        }
        else
            callback(0, "", prof);
    });
}

/**
 * Retorna el perfil de progreso del usuario cuyo username entra por parametro
 * user Nombre de usuario cuyo perfil de progreso se desea recuperar
 */
service.getProfile = function(user, callback) {
    connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback(1, "Error en la base de datos", null);
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    connection.disconnect();
                    if(err)
                        callback(1, err['errmsg'], null);
                    else {
                        if(profile[0])
                            callback(0, null, profile[0])
                        else {
                            callback(1, "El usuario no se ha registrado", null);
                        }
                    }
                });
            }
            else {
                callback(1, "El usuario no existe", null);
            }
        }
    });
}

/**
 * Retorna una lista con todos los logros del usuario cuyo username entra por parametro
 * user Nombre de usuario cuyos logros se desean recuperar
 */
service.getAchivements = function(user, callback) {
    connection.connect();
    var achivementList = [];
    var check = 0;
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos", []);
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    var achivements = profile[0].achivements;
                    for ( achivement of achivements ) {
                        check++;
                        Achivement.find({_id: achivement}, function(err, object) {
                            if(err)
                                callback ("No fue posible recuperar todos los logros", []);
                            else {
                                achivementList.push(object[0]);
                                check--;
                                if(check <= 0) {
                                    connection.disconnect();
                                    callback(null, achivementList);
                                }
                            }
                        });
                    }
                });
            }
        }
    });
}

/**
 * Retorna una lista con todos los logros registrados en la base de datos
 */
service.getAchivementList = function(callback) {
    connection.connect();
    Achivement.find({}, function(err, response){
        connection.disconnect();
        if(err)
            callback(err, []);
        else
            callback(null, response);
    })
}

/**
 * Asigna el achivmete cuyo id entra por parametro al usuario cuyo username entra por parametro
 * user Nombre de usuario al que se le desea agregar el nuevo logro
 * achivementID ID de la base de datos del logro que se desea agregar
 */
service.addAchivement = function (user, achivementID, callback) {
    connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                        if(err){
                            callback("No fue posible encontrar el perfil");
                        }else{
                            profile[0].achivements.push(achivementID);
                            profile[0].save(function(err, prof, ver){
                                connection.disconnect();
                                if(err){
                                    callback("No fue posible asignar el logro");
                                }else{
                                    callback(null);
                                }
                            });
                        }
                });
            }
        }
    });
}

/**
 * Actualiza el rol del usuario cuyo username entra por parametro con el rol peovisto
 * user Nombre del usuario
 * role Texto del nuevo rol
 */
service.updateRole = function(user, role, callback){
    connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    if(err){
                        callback("No fue posible encontrar el perfil");
                    }else{
                        profile[0].currentRol = role;
                        profile[0].save(function(err, prof, ver){
                            connection.disconnect();
                            if(err){
                                callback("No fue posible cambiar el rol");
                            }else{
                                callback(null);
                            }
                        });
                    }
                });
            }
        }
    });
}

/**
 * Activa la bandera de progreso especificadel usuario que entra por parametro
 * user Nombre de usuario que registra el progreso
 * flag Bandera especifica que se desea activar
 */
service.activateFlag = function(user, flag, callback){
    connection.connect();
    console.log(flag);
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    if(err){
                        callback("No fue posible encontrar el perfil");
                    }else{
                        var userProgress = profile[0];
                        userProgress[flag] = true;
                        userProgress.save(function(err, prof, ver){
                            connection.disconnect();
                            if(err){
                                callback("No fue posible actualizar el progreso");
                            }else{
                                callback(null);
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = service;