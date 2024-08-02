import WebSocket, { WebSocketServer } from "ws";

import { PORT } from "./config";

interface ProtocolHandler {
	handleMessage(data: WebSocket.Data, client: WebSocket): void;
}

class WebSocketHandler implements ProtocolHandler {
	private ws: WebSocket;

	constructor(ws: WebSocket) {
		this.ws = ws;
	}

	handleMessage(data: WebSocket.Data, client: WebSocket): void {
		client.send(data);
	}
}

class ProtocolFactory {
	static createHandler(
		protocol: string,
		connection: WebSocket
	): ProtocolHandler {
		switch (protocol) {
			case "websocket":
				return new WebSocketHandler(connection);
			// Future protocols 
			default:
				throw new Error(`Unsupported protocol: ${protocol}`);
		}
	}
}



const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws: WebSocket) => {
	const handler = ProtocolFactory.createHandler("websocket", ws);

	ws.on("error", console.error);

	ws.on("message", (data: WebSocket.Data) => {
		data = data.toString();
		if (data.length > 0) {
			wss.clients.forEach((client: WebSocket) => {
				if (client.readyState === WebSocket.OPEN) {
					handler.handleMessage(data, client);
				}
			});
		}
	});

});

console.log("Listening on Port", PORT);