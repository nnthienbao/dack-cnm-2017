var WebSocket = require('ws');

var config = require('./config/config-system.json');

const ws = new WebSocket(config.kcoinUriSocket);

ws.on('open', function open() {
    console.log('WS connect api-kcoin success');

    setInterval(function () {
        ws.send("Send dummy data");
        console.log("Send dummy data");
    }, 30000);
});

ws.on('message', function incoming(data) {
    console.log(data);
});