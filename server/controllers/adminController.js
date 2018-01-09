const forEach = require('lodash').forEach;

const User = require('../models/User');
const TransactionLocal = require('../models/TransactionLocal');
const Utils =  require('../common/Utils');

const MAX_LIMIT = 100;

module.exports.getStatistics = function (req, res) {
    let statistic = {
        totalUser: 0,
        totalRealableCoin: 0,
        totalAvailableCoin: 0
    };

    User.find({isAdmin: undefined}).then(listUsers => {
        statistic.totalUser = listUsers.length;
        Utils.getTotalCoinOfSystem().then(totalCoin => {
            statistic.totalRealableCoin = totalCoin.totalRealableCoin;
            statistic.totalAvailableCoin = totalCoin.totalAvailableCoin;

            return res.status(200).json(statistic);
        }).catch(err=> {
            console.log(err);
            return res.sendStatus(500);
        })
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
};

module.exports.getInfoUserAccount = function (req, res) {
    let limit = parseInt(req.query.limit);
    if(limit > MAX_LIMIT) limit = MAX_LIMIT;
    const page = parseInt(req.query.page);

    const option = {
        limit: limit,
        skip: limit * page
    };

    let userInfos = [];

    return User.find({isAdmin: undefined}, {}, option).then(listUsers => {
        return User.count({isAdmin: undefined}).then(totalItem => {
            forEach(listUsers, user => {
                userInfos.push({
                    username: user.username,
                    email: user.email,
                    coin: {
                        realable: user.realableWallet,
                        available: user.realableWallet - user.lockedWallet
                    }
                });
            });
            return res.header('total-item', totalItem).status(200).json(userInfos);
        });
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    })
};

module.exports.getListTransaction = function (req, res) {
    let limit = parseInt(req.query.limit);
    if(limit > MAX_LIMIT) limit = MAX_LIMIT;
    const page = parseInt(req.query.page);

    const option = {
        limit: limit,
        skip: limit * page
    };

    let transactions = [];
    TransactionLocal.find({}, {}, option).populate('_userId').then(listTrans => {
        forEach(listTrans, trans => {
            transactions.push({
                username: trans._userId.username,
                value: trans.value,
                status: trans.status,
                referencedOutputHash: trans.referencedOutputHash,
                referencedOutputIndex: trans.referencedOutputIndex
            })
        });
        return res.status(200).json(transactions);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    })
};

module.exports.getListAddress = function (req, res) {
    let limit = parseInt(req.query.limit);
    if(limit > MAX_LIMIT) limit = MAX_LIMIT;
    let page = parseInt(req.query.limit);

    const option = {
        limit: limit,
        skip: limit * page
    };

    let listAddress = [];
    User.find({}, {}, option).then(listUser => {
        let promises = [];
        forEach(listUser, user => {
            promises.push(
                Utils.getCoinByAddress(user.address).then(coin => {
                    listAddress.push({
                        address: user.address,
                        username: user.username,
                        coin: coin
                    })
                })
            );
        });
        return Promise.all(promises).then(() => {
            return res.status(200).json(listAddress);
        });
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    })
};















