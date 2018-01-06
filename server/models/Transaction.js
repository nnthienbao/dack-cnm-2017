const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    hash: { type: String, require: true, unique: true },
    version: { type: Number, require: true }
});

module.exports = mongoose.model('Transaction', TransactionSchema);