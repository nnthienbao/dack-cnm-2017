const request = require('request-promise');
const forEach = require('lodash').forEach;

const { saveBlock, saveTransaction, saveInput, saveOutput } = require('./saveToDb');

const URI_KCOIN_API = "https://api.kcoin.club/";

module.exports.fetchDataFromKcoin = function () {
    const LIMIT = 100;
    let i = 0;

    const loop = function () {
        fetchBlockKcoin(LIMIT, i * LIMIT).then(res => {
            const blocks = JSON.parse(res);

            // Dong bo array blocks vao db
            forEach(blocks, (block, index) => {
                // Save block
                saveBlock({...block, weight: LIMIT*i + index});

                // Save tung transaction trong block
                forEach(block.transactions, (transaction) => {
                    // Luu transaction
                    saveTransaction(transaction);

                    // Save tung input trong transaction
                    forEach(transaction.inputs, (input, index) => {
                        saveInput({...input, index: index}, transaction.hash);
                    });

                    // Save tung output trong transaction
                    forEach(transaction.outputs, (input, index) => {
                        saveOutput({...input, index: index}, transaction.hash);
                    })
                })
            });


            if(blocks.length < LIMIT) {
                return true;
            } else {
                i++;
                return loop();
            }
        }).catch(error => {
            throw (error);
        })
    };

    return loop();
};

const fetchBlockKcoin = function (limit, offset) {
    return request.get(URI_KCOIN_API + "blocks?offset=" + offset + "&limit=" + limit);
};