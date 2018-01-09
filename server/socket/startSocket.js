const WebSocket = require('ws');

const config = require('../config/config-system.json');
const { executeListenedBlock } = require('./handleReceiveMessage');

const ws = new WebSocket(config.kcoinUriSocket);

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

    data = JSON.parse(data);

    if(data.type === "block") {
        console.log("tim thay block! ");
        const block = data.data;
        executeListenedBlock(block);
    }
});





















