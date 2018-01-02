const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionOutputSchema  = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true},
    hash: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('TransactionOutput', TransactionOutputSchema);