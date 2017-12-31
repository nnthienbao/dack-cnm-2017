const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenVerifySchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    type: { type: String, require: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

module.exports = mongoose.model('TokenVerify', TokenVerifySchema);