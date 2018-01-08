const lodash = require('lodash');

const User = require('../models/User');
const OutputTransaction = require('../models/OuputTransaction');
const InputTransaction = require('../models/InputTransaction');
const Transaction = require('../models/Transaction');
const TransactionLocal = require('../models/TransactionLocal');
const { HOAN_THANH } = require('../common/statusTransaction');

module.exports = {
    whenReceiveTransaction: function (data) {

        TransactionLocal.findOne({referencedOutputHash: data.hash}).populate({_userId}).then(transLocal => {
            //  Thay doi tien neu phat hien nguoi chuyen tu he thong
            if (transLocal) {
                const user = transLocal._userId;

                user.lockedWallet -= transLocal.value;
                user.realableWallet -= transLocal.value;
                user.save().catch(err => {
                    console.log(err);
                })
                transLocal.status = HOAN_THANH;
                transLocal.save().catch(err => {
                    console.log(err);
                }
            }
            //  Cong tien tu tat ca cac output ma chung ta co mat trong he thong
            else {

                lodash.forEach(data.outputs, function (output, index) {

                    let address = output.lockScript.split(" ")[1];

                    User.findOne({address: address}).then(user => {

                        console.log(user);

                        if (user) {
                            let realableWallet = user.realableWallet + output.value;
                            console.log('realable Wallet: ' + realableWallet);

                            User.updateOne({address: address},
                                {
                                    realableWallet: realableWallet,
                                }, (err) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                });
                        }

                        console.log(user);

                    }).catch(err => {
                        console.log(err);
                    });
                });
            }
        });

        let hashTransaction = data.hash;

        let svTransaction = new Transaction({
            hash: hashTransaction,
            version: 1
        })

        svTransaction.save(err => {

            if (err) {
                console.log(err);
                return false;
            }

            //  Luu inputs cua transaction
            lodash.forEach(data.inputs, (input, index) => {

                let svInputTransaction = new InputTransaction({
                    unlockScript: input.unlockScript,
                    referencedOutputHash: input.referencedOutputHash,
                    referencedOutputIndex: input.referencedOutputIndex,
                    index: index,
                    hash_transaction: hashTransaction
                });

                svInputTransaction.save(err => {
                    if (err) console.log(err);
                    return false;
                })
            });

            //  Luu outputs cua transaction
            lodash.forEach(data.outputs, function (output, index) {

                let outputTransaction = new OutputTransaction({
                    value: output.value,
                    lockScript: output.lockScript,
                    index: index,
                    hash_transaction: hashTransaction
                });

                outputTransaction.save(function (err) {
                    if(err) {
                        console.log(err);
                        return false;
                    }
                });
            });
        });
    }
}