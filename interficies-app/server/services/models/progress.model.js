var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProgressSchema = new Schema({
    userID: {type: String, required: true, unique: true},
    currentRol: { type: String, required: true },
    level: { type: String, required: true },
    avatar: {type: String, required: true},
    // Progress Flags
    videnteAsig:Boolean,
    vidente:Boolean,
    juglarAsig:Boolean,
    juglar:Boolean,
    tallerAsig:Boolean,
    taller:Boolean,
    arqueologo:Boolean,
    criticoAsig:Boolean,
    critico:Boolean,
    periodistaAsig:Boolean,
    periodista:Boolean,
});

module.exports = mongoose.model('Progress', ProgressSchema);