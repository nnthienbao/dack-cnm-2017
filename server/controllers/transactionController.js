const request = require('request-promise');
const forEach = require('lodash').forEach;

// const InputTransaction = require('../models/InputTransaction');
// const OutputTransaction = require('../models/OuputTransaction');
const User = require('../models/User');
const TransactionLocal = require('../models/TransactionLocal');
const sendConfirmTransaction = require('../common/mailSender').sendConfigTransaction;
const { KHOI_TAO } = require('../common/statusTransaction');
const Utils = require('../common/Utils');


module.exports.requestCreateTransaction = function (req, res) {
    const sendValue = parseInt(req.body.value) ;
    const receiverAddress = req.body.receiverAddress;

    User.findOne({_id: req.user._id}).then(user => {
        const remainWallet = user.realableWallet - user.lockedWallet;
        if(remainWallet < sendValue) return res.status(400).json({msg: "Không đủ số dư"});

        let transLocal = new TransactionLocal({
            _userId: user,
            value: sendValue,
            receiverAddress: receiverAddress,
            status: KHOI_TAO,
        });

        const tokenConfirm = Utils.createTokenConfirmTransaction(transLocal);

        tokenConfirm.save().then(transLocal.save().then(sendConfirmTransaction(user, tokenConfirm).then(()=> {
            return res.sendStatus(200);
        }))).catch(()=> {
            return res.sendStatus(500);
        })
    });
};

module.exports.createTransaction = function(req, res) {
    const sendValue = parseInt(req.body.sendValue) ;
    const receiveAddress = req.body.receiveAddress;

    User.findOne({_id: req.user._id}).then(foundUser => {
        const lockScriptUser = 'ADD ' + foundUser.key.address;
        const remainWallet = foundUser.rfealableWallet - foundUser.lockedWallet;

        if (remainWallet >= sendValue) {

            Utils.searchOutputNonUsingList(lockScriptUser).then((outputNonUsingList) => {

                let newTransaction = {
                    version: 1,
                    inputs: [],
                    outputs: []
                }

                let count = 0;
                let keys = [];

                forEach(outputNonUsingList, output => {
                    count += output.value;
                    newTransaction.inputs.push({
                        referencedOutputHash: output.hash_transaction,
                        referencedOutputIndex: output.index,
                        unlockScript: ''
                    });
                    keys.push(foundUser.key);
                    if (count > sendValue) {
                        return false;
                    }
                });

                let remainCoin = count - sendValue;

                newTransaction.outputs.push({
                    value: remainCoin,
                    lockScript: lockScriptUser
                })
                newTransaction.outputs.push({
                    value: sendValue,
                    lockScript: 'ADD ' + receiveAddress
                })

                Utils.createInputUnlockScript(newTransaction, keys);

                const option = {
                    method: 'POST',
                    uri: 'https://api.kcoin.club/transactions',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: newTransaction,
                    json: true
                }

                request(option).then(function(parsedBody) {
                    console.log(parsedBody);
                    return res.sendStatus(200);
                }).catch(function(err) {
                    console.log(err);
                    return res.sendStatus(400);
                });
            });
        } else {
            return res.sendStatus(400);
        };
    });
};