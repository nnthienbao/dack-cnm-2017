const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InputTransactionSchema = Schema({
    hash_transaction: { type: String, require: true },
    index: { type: Number, require: true },
    unlockScript: { type: String, require: true },
    referencedOutputHash: { type: String, require: true },
    referencedOutputIndex: { type: Number, require: true }
});

module.exports = mongoose.model('InputTransaction', InputTransactionSchema);