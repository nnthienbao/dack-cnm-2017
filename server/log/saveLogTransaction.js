const log4js = require('log4js');

const localTransactionLogger = log4js.getLogger('localTransaction');
const sendTransactionLogger = log4js.getLogger('sendTransaction');
const receiveTransactionLogger = log4js.getLogger('receiveTransaction');

module.exports.saveLocalTransactionToLog = function(data) {
    data = JSON.stringify(data);
    localTransactionLogger.info(data);
}

module.exports.saveSendTransactionToLog = function(data) {
    data = JSON.stringify(data);
    sendTransactionLogger.info(data);
}

module.exports.saveReceiveTransactionToLog = function(data) {
    data = JSON.stringify(data);
    receiveTransactionLogger.info(data);
}