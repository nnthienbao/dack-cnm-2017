const Block = require('../models/Block');
const Transaction = require('../models/Transaction');
const InputTransaction = require('../models/InputTransaction');
const OutputTransaction = require('../models/OuputTransaction');

module.exports = {
    saveBlock: function (block) {
        Block.findOne({ hash: block.hash}).then(oldBlock => {
            if(oldBlock === null) {
                const blockDb = new Block(block);
                blockDb.save(function (err) {
                    if(err) console.log(err);
                });
            }
        });
    },

    saveTransaction: function (transaction) {
        Transaction.findOne({ hash: transaction.hash }).then(oldTransaction => {
            if(oldTransaction === null) {
                const transDb = new Transaction(transaction);
                transDb.save(err => {
                    if(err) console.log(err);
                })
            }
        });
    },

    saveInput: function (input, hash_transaction) {
        InputTransaction.findOne({ hash_transaction: hash_transaction, index: input.index}).then(oldInput => {
            if(oldInput === null) {
                const inputDb = new InputTransaction({...input, hash_transaction: hash_transaction});
                inputDb.save(err => {
                    if(err) console.log(err);
                })
            }
        })
    },

    saveOutput: function (output, hash_transaction) {
        OutputTransaction.findOne({ hash_transaction: hash_transaction, index: output.index}).then(oldOutput => {
            if(oldOutput === null) {
                const outputDb = new OutputTransaction({...output, hash_transaction: hash_transaction});
                outputDb.save(err => {
                    if(err) console.log(err);
                })
            }
        })
    }
};
