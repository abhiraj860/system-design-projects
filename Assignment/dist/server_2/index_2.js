"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const config_1 = require("../config");
const redis_1 = require("redis");
const publishClient = (0, redis_1.createClient)();
const subscribeClient = (0, redis_1.createClient)();
const PORT = config_1.SERVER_PORT_2;
const wss = new ws_1.WebSocketServer({ port: PORT });
subscribeClient.subscribe("room1", (message) => {
    console.log(message, " ", PORT);
});
wss.on("connection", function connection(ws) {
    console.log(PORT, " connected");
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        console.log("Published ", PORT);
        publishClient.publish("room1", JSON.stringify(data));
    });
});
console.log("Listenining on PORT ", PORT);
