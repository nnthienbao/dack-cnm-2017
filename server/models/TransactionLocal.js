const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionLocalSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: { type: Number, required: true},
    receiverAddress: { type: String },
    status: { type: String, required: true },
    referencedOutputHash: { type: String },
    referencedOutputIndex: { type: Number },
    isLocal: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('TransactionLocal', TransactionLocalSchema);