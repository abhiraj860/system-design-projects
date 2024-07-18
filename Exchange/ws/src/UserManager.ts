import { WebSocket } from "ws"; // import websocket from the ws
import { User } from "./User"; // import the user class
import { SubscriptionManager } from "./SubscriptionManager"; // import the subscription manager

export class UserManager { // create a usermanager class
    private static instance: UserManager; // create a static instance variable for the userMange of the same type
    private users: Map<string, User> = new Map(); // create a map that maps id to the User which is of the class User

    private constructor() { // create a private constructor
        
    }
    
    // create a singleton pattern
    public static getInstance() { // instantiate a getInstance method
        if (!this.instance)  { // if this instance is not present
            this.instance = new UserManager(); // create a new instance 
        }
        return this.instance; // return the new instance depending on whether it is created or not
    }

    public addUser(ws: WebSocket) { // function to the add the user
        const id = this.getRandomId(); // create a random user ID
        const user = new User(id, ws); // create a new User class with id and ws of the user as input
        this.users.set(id, user); // set the map of the user from the id of the user which is a string to the user class
        this.registerOnClose(ws, id); // add the register on close, so that whenever the connection closes delete the user from the subscriptions
        return user; // return the user
    }

    private registerOnClose(ws: WebSocket, id: string) { // function on register on close
        ws.on("close", () => { // when the ws is closed from the users
            this.users.delete(id); // delete the user from the map
            SubscriptionManager.getInstance().userLeft(id); // tell the subscriptionManager that the user has left
        });
    }

    public getUser(id: string) { // used to get the user id
        return this.users.get(id); // return the id to the user
    }

    private getRandomId() { // class to create a random Id
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // create a randomId for every user
    }
}