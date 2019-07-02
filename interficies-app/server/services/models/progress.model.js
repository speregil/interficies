var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProgressSchema = new Schema({
    userID: {type: String, required: true, unique: true},
    currentRol: { type: String, required: true },
    level: { type: String, required: true },
    achivements: [String],
    // Progress Flags
    a1:Boolean,
    o:Boolean,
    l:Boolean,
    d:Boolean,
    j1:Boolean,
    f:Boolean,
    i:Boolean,
    a2:Boolean,
    j2:Boolean,
    p:Boolean,
    j3:Boolean
});

module.exports = mongoose.model('Progress', ProgressSchema);