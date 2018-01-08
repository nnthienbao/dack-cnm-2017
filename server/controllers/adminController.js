const forEach = require('lodash').forEach;

const User = require('../models/User');
const Utils =  require('../common/Utils');

module.exports.getStatistics = function (req, res) {
    let statistic = {
        totalUser: 0,
        totalRealableCoin: 0,
        totalAvailableCoin: 0
    };

    User.find({}).then(listUsers => {
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
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const option = {
        limit: limit,
        skip: limit * page
    };

    let userInfos = [];

    return User.find({}, {}, option).then(listUsers => {

        forEach(listUsers, user => {
            userInfos.push({
                username: user.username,
                coin: {
                    realable: user.realableWallet,
                    available: user.realableWallet - user.lockedWallet
                }
            });
        });

        return res.status(200).json(userInfos);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    })
};