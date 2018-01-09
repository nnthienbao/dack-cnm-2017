const forEach = require('lodash').forEach;

const TransactionLocal = require('../models/TransactionLocal');
const User = require('../models/User');

module.exports.getRechargeHistory = function (req, res) {
    User.findOne({ _id: req.user._id }).then(user => {
        const receiverAdress = user.address;
        let rechargeTransList = [];
        TransactionLocal.find({ receiverAddress: receiverAdress }).sort({ createdAt: "desc" }).then(listTransLocals => {
            forEach(listTransLocals, transLocal => {
                rechargeTransList.push({
                    ref: transLocal._id,
                    value: transLocal.value,
                    createAt: transLocal.createdAt
                })
            });

            return res.status(200).json(rechargeTransList);

        })

    }).catch(() => {
        return res.status(500);
    })
};

module.exports.getWithdrawHistory = function (req, res) {

};