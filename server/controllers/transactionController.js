const request = require('request-promise');
const forEach = require('lodash').forEach;

// const InputTransaction = require('../models/InputTransaction');
// const OutputTransaction = require('../models/OuputTransaction');
const User = require('../models/User');
const TransactionLocal = require('../models/TransactionLocal');
const TokenConfirmTransacion = require('../models/TokenConfirmTransaction');
const sendConfirmTransaction = require('../common/mailSender').sendConfigTransaction;
const { KHOI_TAO, DANG_XU_LY } = require('../common/statusTransaction');
const Utils = require('../common/Utils');


module.exports.requestCreateTransaction = function (req, res) {
    const sendValue = parseInt(req.body.value) ;
    const receiverAddress = req.body.receiverAddress;

    User.findOne({_id: req.user._id}).then(user => {
        const remainWallet = user.realableWallet - user.lockedWallet;
        if(remainWallet < sendValue) return res.status(400).json({msg: "Không đủ số dư"});

        Utils.isEnoughOutputForTransaction(sendValue, user.key.address).then(isEnough => {
            if(!isEnough) res.status(406).json({msg: "Bạn vui lòng đợi giao dịch trước xử lý xong"});

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
    });
};

module.exports.createTransaction = function(req, res) {
    const token = req.body.token;

    const populateOption = {
        path: '_transId',
        model: 'TransactionLocal',
        populate: {
            path: '_userId',
            model: 'User'
        }
    };
    TokenConfirmTransacion.findOne({token: token}).populate(populateOption).then((tokenConfirm) => {
        if(tokenConfirm === null) return res.status(400).json({msg: "Không tìm thấy token"});

        const transLocal = tokenConfirm._transId;
        const foundUser = transLocal._userId;
        const sendValue = transLocal.value;
        const receiveAddress = transLocal.receiverAddress;

        const lockScriptUser = 'ADD ' + foundUser.key.address;

        Utils.searchOutputNonUsingList(lockScriptUser).then((outputNonUsingList) => {

            let newTransaction = {
                version: 1,
                inputs: [],
                outputs: []
            };

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
                if (count >= sendValue) {
                    return false;
                }
            });

            let remainCoin = count - sendValue;

            if(remainCoin > 0) {
                newTransaction.outputs.push({
                    value: remainCoin,
                    lockScript: lockScriptUser
                });
            }

            newTransaction.outputs.push({
                value: sendValue,
                lockScript: 'ADD ' + receiveAddress
            });

            Utils.createInputUnlockScript(newTransaction, keys);

            const option = {
                method: 'POST',
                uri: 'https://api.kcoin.club/transactions',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newTransaction,
                json: true
            };

            request(option).then(function(parsedBody) {
                // Cap nhat so du
                foundUser.lockedWallet += sendValue;
                // Cap nhat trang thai giao dich
                transLocal.status = DANG_XU_LY;

                foundUser.save().then(transLocal.save().then(() => {
                    return res.sendStatus(200);
                }));
            }).catch(function(err) {
                console.log(err);
                return res.sendStatus(400);
            });
        });
    });
};