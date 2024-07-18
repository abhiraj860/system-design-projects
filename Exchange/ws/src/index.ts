import { WebSocketServer } from "ws"; // import the web socket server from ws
import { UserManager } from "./UserManager"; // import the userManager

const wss = new WebSocketServer({ port: 3001 }); // create a new object and define port on which the web socket will run

// when an user connects to the web socket server add the socket using the manager class
wss.on("connection", (ws) => { // when a user connects to the web socket server
    UserManager.getInstance().addUser(ws); // get the single instance of user manager and add the web socket object of the user.
});

