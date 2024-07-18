import { WebSocket } from "ws"; // import websocket from ws
import { OutgoingMessage } from "./types/out"; // import the outgoing message (to the users browsers) type
import { SubscriptionManager } from "./SubscriptionManager";
import { IncomingMessage, SUBSCRIBE, UNSUBSCRIBE } from "./types/in"; // import the types of incoming messages from the pubsub (subscribe and unsubscribe)

export class User { // initiate a class called user
    private id: string; // id of the user
    private ws: WebSocket; // websocket of the user

    constructor(id: string, ws: WebSocket) { // create a constructor for the user class
        this.id = id; // an id should be the input of the constructor class
        this.ws = ws; // a websocket should be the input of the constructor class
        this.addListeners(); // add event listeners to the user objects
    }

    private subscriptions: string[] = []; // the subscriptions array contains all the channels to subscribe to

    public subscribe(subscription: string) { // input the channels that need to be subscribed
        this.subscriptions.push(subscription); // push the channels that needs subscription in the array
    }

    public unsubscribe(subscription: string) { // to unsubscribe from channel 
        this.subscriptions = this.subscriptions.filter(s => s !== subscription); // remove the channel from the subscriptions array
    }

    emit(message: OutgoingMessage) {  // this is used to emit the message to the browser
        this.ws.send(JSON.stringify(message)); // send the message through the websocket to the browser
    }

    private addListeners() { // add event listeners
        this.ws.on("message", (message: string) => { // when the user send a message
            const parsedMessage: IncomingMessage = JSON.parse(message); // parse the incoming message from the browser
            if (parsedMessage.method === SUBSCRIBE) { // if the messsage is to subscribe
                parsedMessage.params.forEach(s => SubscriptionManager.getInstance().subscribe(this.id, s)); // subscribe this to the subscription manager
            }

            if (parsedMessage.method === UNSUBSCRIBE) { // if the message is to unsubscribe
                parsedMessage.params.forEach(s => SubscriptionManager.getInstance().unsubscribe(this.id, parsedMessage.params[0])); // unsubscribe from the subscription manager
            }
        });
    }

}