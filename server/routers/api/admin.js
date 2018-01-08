const express = require('express');
const Router = express.Router();

const User = require('../../models/User');
const Utils =  require('../../common/Utils');


Router.get('/statistic', (req, res) => {
    const statistic = {
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
});


module.exports = Router;