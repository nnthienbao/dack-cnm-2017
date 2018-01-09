const WebSocket = require('ws');

const config = require('../config/config-system.json');
const { executeListenedBlock } = require('./handleReceiveMessage');


const ws = new WebSocket(config.kcoinUriSocket);

const log4js = require('log4js');
log4js.configure({
    appenders: { listenSocket: { type: 'file', filename: 'listen-socket.log' } },
    categories: { default: { appenders: ['listenSocket'], level: 'info' } }
});

const logger = log4js.getLogger('listenSocket');

ws.on('open', function open() {

    console.log('WS connect api-kcoin success');

    setInterval(function () {
        ws.send("Send dummy data", err => {
            if (err) console.log(err);
        });
        console.log("Send dummy data");
    }, 30000);
});

ws.on('message', function incoming(data) {

    logger.info(data);
    data = JSON.parse(data);

    if(data.type === "block") {
        console.log("tim thay block! ");
        const block = data.data;
        executeListenedBlock(block);
    }
});





















