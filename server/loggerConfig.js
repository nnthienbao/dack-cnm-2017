const log4js = require('log4js');

log4js.configure({
    appenders: {
        localTransaction: { type: 'file', filename: './log/localTransaction.log' },
        sendTransaction: { type: 'file', filename: './log/sendTransaction.log' },
        receiveTransaction: { type: 'file', filename: './log/receiveTransaction.log' }
    },
    categories: {
        default: { appenders: ['localTransaction'], level: 'info' }
    }
});
