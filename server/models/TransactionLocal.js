const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionLocalSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    value: { type: Number, required: true},
    receiverAddress: { type: String },
    status: { type: String, required: true },
    referencedOutputHash: { type: String },
    referencedOutputIndex: { type: Number },
});

module.exports = mongoose.model('TransactionLocal', TransactionLocalSchema);