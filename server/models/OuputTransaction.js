const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OutputTransactionSchema = new Schema({
    hash_transaction: { type: String, require: true },
    value: { type: Number, require: true },
    lockScript: { type: String, require: true },
    index: { type: Number, require: true }
});

module.exports = mongoose.model('OutputTransaction', OutputTransactionSchema);