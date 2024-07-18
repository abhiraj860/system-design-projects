// subscriptions manager
import { RedisClientType, createClient } from "redis"; // import redis client and its type
import { UserManager } from "./UserManager"; // import the user manager

export class SubscriptionManager { // create a subscription manager class
    private static instance: SubscriptionManager; // create a subscriptions manager instance
    private subscriptions: Map<string, string[]> = new Map(); // create a map of that maps from string to array of string 
    private reverseSubscriptions: Map<string, string[]> = new Map(); // create a reverse subscription map
    private redisClient: RedisClientType; // create a redis client for the user manager

    private constructor() { // create a constructor function
        this.redisClient = createClient(); // create a redis client
        this.redisClient.connect(); // connect to the redis client
    }

    // singleton pattern
    public static getInstance() { 
        if (!this.instance)  { // if the instance is not present
            this.instance = new SubscriptionManager(); // create a new instance
        }
        return this.instance; // return the instance
    }

    public subscribe(userId: string, subscription: string) { // for the subscription
        if (this.subscriptions.get(userId)?.includes(subscription)) { // if the subscription channel is included in the userId array then
            return // then return the object
        }
        // if the subscription is not present in the userId array then...
        this.subscriptions.set(userId, (this.subscriptions.get(userId) || []).concat(subscription)); // at the subscription to the user map
        this.reverseSubscriptions.set(subscription, (this.reverseSubscriptions.get(subscription) || []).concat(userId)); // this is the reverse subscription where for each subscription the userId is added
        if (this.reverseSubscriptions.get(subscription)?.length === 1) { // if the subscription has atleast one user then connect to the redis callback handler

            this.redisClient.subscribe(subscription, this.redisCallbackHandler); // subscribe to the redis pubsub on the subscription channel
        }
    }

    private redisCallbackHandler = (message: string, channel: string) => { // this is the redis callback handler
        const parsedMessage = JSON.parse(message); // get the parsed message in parsedMessage and process it accordingly 
        this.reverseSubscriptions.get(channel)?.forEach(s => UserManager.getInstance().getUser(s)?.emit(parsedMessage));
        // get the channel and for each of the user subscribed to the channel emit the parsed message once subscribed
    }

    public unsubscribe(userId: string, subscription: string) { // unsubscribe the user from the websocket
        const subscriptions = this.subscriptions.get(userId); // get the list of user id from the subscriptions map
        if (subscriptions) { // if the subscriptions are present
            this.subscriptions.set(userId, subscriptions.filter(s => s !== subscription)); // remove the subscription from the subscription map
        }
        const reverseSubscriptions = this.reverseSubscriptions.get(subscription); // now get the subscriptions users from the reverse subscriptions
        if (reverseSubscriptions) { // if the reverseSubscriptions are present
            this.reverseSubscriptions.set(subscription, reverseSubscriptions.filter(s => s !== userId)); // then remove that user from the unsubscription array
            if (this.reverseSubscriptions.get(subscription)?.length === 0) { // if the length of the reverse subscription is zero
                this.reverseSubscriptions.delete(subscription); // delete the subscription reverse subscription
                this.redisClient.unsubscribe(subscription); // unsubscribe from redis client from the specific channel
            }
        }
    }

    public userLeft(userId: string) { // this is for the userleft
        console.log("user left " + userId); // print out the userId 
        this.subscriptions.get(userId)?.forEach(s => this.unsubscribe(userId, s)); // when the user leaves, for each of the channels subscribed unsubscribe them
    }
    
    getSubscriptions(userId: string) { // this mehod is used to get the subscription
        return this.subscriptions.get(userId) || []; // return the subscriptions of the userId
    }
}