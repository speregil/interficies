var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProgressSchema = new Schema({
    userID: {type: String, required: true, unique: true},
    currentRol: { type: String, required: true },
    level: { type: String, required: true },
    achivements: [String],
    avatar: {type: String, required: true},
    // Progress Flags
    j:Boolean,
    r:Boolean,
    l:Boolean,
    d:Boolean,
    f:Boolean,
    i:Boolean
});

module.exports = mongoose.model('Progress', ProgressSchema);