const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    key: {
        type: Object,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    realableWallet: {
        type: Number,
        default: 0
    },
    lockedWallet: {
        type: Number,
        default: 0
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hashPassword);
}

module.exports = mongoose.model('User', UserSchema);