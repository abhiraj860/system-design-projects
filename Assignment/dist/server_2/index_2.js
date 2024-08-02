"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const PORT = 8081;
const wss = new ws_1.WebSocketServer({ port: PORT });
wss.on('connection', function connection(ws) {
    console.log(PORT, " connected");
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.send('something');
});
console.log("Listenining on PORT ", PORT);
