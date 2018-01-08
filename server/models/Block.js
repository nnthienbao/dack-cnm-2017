const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlockSchema = new Schema({
    hash: { type: String, require: true, unique: true},
    nonce: { type: Number, require: true },
    version: { type: Number, require: true },
    timestamp: { type: Number, require: true },
    difficulty: { type: Number, require: true },
    weight: { type: Number, require: true },
});

module.exports = mongoose.model('Block', BlockSchema);