const request = require('request-promise');
const forEach = require('lodash').forEach;

// const InputTransaction = require('../models/InputTransaction');
// const OutputTransaction = require('../models/OuputTransaction');
const User = require('../models/User');
const TransactionLocal = require('../models/TransactionLocal');
const TokenConfirmTransacion = require('../models/TokenConfirmTransaction');
const sendConfirmTransaction = require('../common/mailSender').sendConfigTransaction;
const { KHOI_TAO, DANG_XU_LY, HOAN_THANH } = require('../common/statusTransaction');
const Utils = require('../common/Utils');
const validateTransacton = require('../validation/validateTransaction').default;


module.exports.requestCreateTransaction = function (req, res) {
    const sendValue = parseInt(req.body.value) ;
    const receiverAddress = req.body.receiverAddress;

    // Validate Transaction
    const { errors, isValid } = validateTransacton(req.body);
    if(!isValid) return res.status(400).json(errors);

    User.findOne({_id: req.user._id}).then(user => {
        const remainWallet = user.realableWallet - user.lockedWallet;
        if(remainWallet < sendValue) return res.status(400).json({error: "Không đủ số dư"});

        User.findOne({address: receiverAddress}).then(receiveUser => {
            let isLocal = false;

            if(receiveUser) {
                isLocal = true
            }
            let transLocal = new TransactionLocal({
                _userId: user,
                value: sendValue,
                receiverAddress: receiverAddress,
                status: KHOI_TAO,
                isLocal: isLocal
            });

            const tokenConfirm = Utils.createTokenConfirmTransaction(transLocal);
            if(isLocal) {
                tokenConfirm.save().then(transLocal.save().then(sendConfirmTransaction(user, tokenConfirm).then(()=> {
                    return res.sendStatus(200);
                }))).catch(()=> {
                    return res.sendStatus(500);
                })
            } else {
                Utils.isEnoughOutputForTransaction(sendValue).then(isEnough => {
                    if(!isEnough) res.status(406).json({error: "Bạn vui lòng đợi giao dịch trước xử lý xong"});

                    tokenConfirm.save().then(transLocal.save().then(sendConfirmTransaction(user, tokenConfirm).then(()=> {
                        return res.sendStatus(200);
                    }))).catch(()=> {
                        return res.sendStatus(500);
                    })
                });
            }
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
        if(tokenConfirm === null) return res.status(400).json({error: "Không tìm thấy token"});
        if(tokenConfirm._transId === null) return res.status(400).json({error: "Không tìm thấy giao dịch"});

        if(tokenConfirm._transId.status !== KHOI_TAO) return res.status(400).json({ error: "Giao dịch đã được xử lý" });

        const transLocal = tokenConfirm._transId;
        const foundUser = transLocal._userId;
        const sendValue = transLocal.value;
        const receiverAddress = transLocal.receiverAddress;
        const lockScriptUser = 'ADD ' + foundUser.key.address;
        const isLocal = transLocal.isLocal;

        if (isLocal) {
            User.findOne({address: receiverAddress}).then(receiveUser => {
                if (receiveUser === null) {
                    return res.sendStatus(404);
                }
                // Cap nhat lai so tien nguoi gui va nhan
                foundUser.realableWallet -= sendValue;
                receiveUser.realableWallet += sendValue;

                // Cap nhat trang thai giao dich
                transLocal.status = HOAN_THANH;

                foundUser.save().then(receiveUser.save().then(transLocal.save().then(() => {
                    return res.sendStatus(200);
                }))).catch(err => {
                    console.log(err);
                    return res.sendStatus(500);
                });
            }).catch(err => {
                return res.sendStatus(500);
            });
        }
        else {
            //  lay danh sach tat ca cac output phu hop de lam input
            Utils.searchOutputNonUsingList().then((outputNonUsingList) => {

                let newTransaction = {
                    version: 1,
                    inputs: [],
                    outputs: []
                };

                let count = 0;
                let keys = [];

                let promises = []

                //  tu danh sach output lay ra key tuong ung (luc nay key chua duoc xap sep)
                forEach(outputNonUsingList, output => {
                    promises.push(Utils.findKeyByOutput(output).then(key => {
                        keys.push(key);
                    }));
                })

                //  Chay promise lay key
                Promise.all(promises).then(() => {

                    //  Sap xep lai key theo thu tu phu hop voi output de co the tao chu ky
                    keys = Utils.sortKey(outputNonUsingList, keys);

                    //  Tao input cho transaction
                    forEach(outputNonUsingList, output => {
                        count += output.value;
                        newTransaction.inputs.push({
                            referencedOutputHash: output.hash_transaction,
                            referencedOutputIndex: output.index,
                            unlockScript: ''
                        });
                        if (count > sendValue) {
                            return false;
                        }
                    });

                    let remainCoin = count - sendValue;

                    //  Tao output dia chi nhan tien thua
                    if(remainCoin > 0) {
                        newTransaction.outputs.push({
                            value: remainCoin,
                            lockScript: lockScriptUser
                        });
                    }

                    //  Tao output gui tien
                    newTransaction.outputs.push({
                        value: sendValue,
                        lockScript: 'ADD ' + receiverAddress
                    });

                    //  Ky ten len transaction
                    Utils.createInputUnlockScript(newTransaction, keys);

                    console.log(newTransaction);

                    //  Tao option gui request
                    const option = {
                        method: 'POST',
                        uri: 'https://api.kcoin.club/transactions',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: newTransaction,
                        json: true
                    };
                    //  Gui request den api.kcoin.club
                    request(option).then(function(transUnConfirm) {
                        // Cap nhat so du
                        foundUser.lockedWallet += sendValue;
                        // Cap nhat trang thai giao dich
                        transLocal.status = DANG_XU_LY;
                        transLocal.referencedOutputHash = transUnConfirm.hash;
                        transLocal.referencedOutputIndex = 1;

                        foundUser.save().then(transLocal.save().then(() => {
                            return res.sendStatus(200);
                        }));
                    }).catch(function(err) {
                        console.log(err);
                        return res.sendStatus(400);
                    });

                    // return res.sendStatus(200);
                });

                // forEach(outputNonUsingList, output => {
                //     count += output.value;
                //     newTransaction.inputs.push({
                //         referencedOutputHash: output.hash_transaction,
                //         referencedOutputIndex: output.index,
                //         unlockScript: ''
                //     });
                //     keys.push(foundUser.key);
                //     if (count >= sendValue) {
                //         return false;
                //     }
                // });
                //
                // let remainCoin = count - sendValue;
                //
                // if(remainCoin > 0) {
                //     newTransaction.outputs.push({
                //         value: remainCoin,
                //         lockScript: lockScriptUser
                //     });
                // }
                //
                // newTransaction.outputs.push({
                //     value: sendValue,
                //     lockScript: 'ADD ' + receiverAddress
                // });
                //
                // Utils.createInputUnlockScript(newTransaction, keys);
                //
                // const option = {
                //     method: 'POST',
                //     uri: 'https://api.kcoin.club/transactions',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: newTransaction,
                //     json: true
                // };
                // request(option).then(function(transUnConfirm) {
                //     // Cap nhat so du
                //     foundUser.lockedWallet += sendValue;
                //     // Cap nhat trang thai giao dich
                //     transLocal.status = DANG_XU_LY;
                //     transLocal.referencedOutputHash = transUnConfirm.hash;
                //     transLocal.referencedOutputIndex = 1;
                //
                //     foundUser.save().then(transLocal.save().then(() => {
                //         return res.sendStatus(200);
                //     }));
                // }).catch(function(err) {
                //     console.log(err);
                //     return res.sendStatus(400);
                // });
                //
                // return res.sendStatus(200);
            })
        }
    });
};

module.exports.getInfoTransaction = function (req, res) {
    const ref = req.params.ref;
    TransactionLocal.findOne({ _id: ref }).then(transLocal => {
        return res.status(200).json({
            ref: transLocal._id,
            value: transLocal.value,
            createAt: transLocal.createdAt,
            receiverAddress: transLocal.receiverAddress,
            referencedOutputHash: transLocal.referencedOutputHash,
            referencedOutputIndex: transLocal.referencedOutputIndex,
            status: transLocal.status
        })
    }).catch(err => {
        return res.sendStatus(500);
    })
};

module.exports.deleteTransaction = function (req, res) {
    const ref = req.params.ref;
    TransactionLocal.findOne({ _id: ref }).then(transLocal => {
        if(transLocal === null) {
            return res.status(400).json({error: "Không tìm thấy giao dịch"});
        }
        if(transLocal.status !== KHOI_TAO) {
            return res.status(400).json({error: "Không được hủy giao dịch đã xác nhận"});
        }
        if(transLocal._userId.toString() !== req.user._id) {
            console.log(transLocal._userId);
            return res.sendStatus(403);
        }

        transLocal.remove().then(() => {
            return res.sendStatus(200);
        }).catch(err => {
            return res.sendStatus(500);
        })
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    })
};