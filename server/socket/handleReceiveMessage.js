const lodash = require('lodash');

const User = require('../models/User');
const TransactionOuput = require('../models/TransactionOutput');


module.exports = {
    whenReceiveTransaction: function (transaction) {
        lodash.forEach(transaction.outputs, function (output, index) {
            const address = output.lockScript.split(' ')[1];
            const value = output.value;

            User.findOne({address: address}).then(user => {
                if(user) {
                    let transactionOuput = new TransactionOuput({
                        _userId: user._id,
                        hash: transaction.hash,
                        index: index,
                        value: value
                    });
                    transactionOuput.save(function (err) {
                        if(err) console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        });
    }
};