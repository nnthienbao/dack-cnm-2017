const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenConfirmTransactionSchema = new Schema({
    _transId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'TransactionLocal' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

module.exports = mongoose.model('TokenConfirmTransaction', TokenConfirmTransactionSchema);