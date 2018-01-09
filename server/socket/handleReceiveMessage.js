const { forEach } = require('lodash');

const User = require('../models/User');
const OutputTransaction = require('../models/OuputTransaction');
const InputTransaction = require('../models/InputTransaction');
const TransactionLocal = require('../models/TransactionLocal');
const { HOAN_THANH } = require('../common/statusTransaction');
const { saveReceiveTransactionToLog } = require('../log/saveLogTransaction');

module.exports.executeListenedBlock = function(block) {

    forEach(block.transactions, trans => {

        TransactionLocal.findOne({referencedOutputHash: trans.hash}).populate("_userId").then(transLocal => {
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
                });
            }
            else {
                forEach(trans.outputs, (output, index) => {

                    let address = output.lockScript.split(" ")[1];

                    User.findOne({address: address}).then(user => {

                        if (user) {
                            let realableWallet = user.realableWallet + output.value;

                            user.realableWallet = realableWallet;
                            user.save().catch(err => {
                                console.log(err);
                            })

                            let newTransactionLocal = new TransactionLocal({
                                value: output.value,
                                receiverAddress: address,
                                status: HOAN_THANH,
                                referencedOutputHash: trans.hash,
                                referencedOutputIndex: index,
                                isLocal: false
                            })

                            saveReceiveTransactionToLog(newTransactionLocal);

                            newTransactionLocal.save().catch((err) => {
                                console.log(err);
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                });
            }

            forEach(trans.inputs, (input, index) => {

                InputTransaction.findOne({hash_transaction: trans.hash, index: index}).then(found => {

                    if (found === null) {
                        let svInputTransaction = new InputTransaction({
                            unlockScript: input.unlockScript,
                            referencedOutputHash: input.referencedOutputHash,
                            referencedOutputIndex: input.referencedOutputIndex,
                            index: index,
                            hash_transaction: trans.hash
                        });

                        svInputTransaction.save(err => {
                            if (err) console.log(err);
                            return false;
                        })
                    }
                })
            });

            forEach(trans.outputs, function (output, index) {

                OutputTransaction.findOne({hash_transaction: trans.hash, index: index}).then(found => {

                    if (found === null) {
                        let outputTransaction = new OutputTransaction({
                            value: output.value,
                            lockScript: output.lockScript,
                            index: index,
                            hash_transaction: trans.hash
                        });

                        outputTransaction.save(function (err) {
                            if(err) {
                                console.log(err);
                                return false;
                            }
                        });
                    }
                });
            });
        });
    })
}
