// This module is used to connect to the redis queue and redis pubsub
import { RedisClientType, createClient } from "redis"; // import client from redis
import { MessageFromOrderbook } from "./types"; // import types
import { MessageToEngine } from "./types/to"; // import types

export class RedisManager { // declare class redisManager
    private client: RedisClientType; // declare client for the queue
    private publisher: RedisClientType; // decleare publisher client
    private static instance: RedisManager; // declare instance as static of type RedisManager to follow singleton pattern

    private constructor() { // create a private constructor
        this.client = createClient(); // create a client to subscribe to the pubsub
        this.client.connect(); // connect to redis (for the pubsub) 
        this.publisher = createClient(); // create a client to push into the redis queue
        this.publisher.connect(); // client connects to the redis (used for the queue)
    }

    // Singleton Pattern
    public static getInstance() {
        if (!this.instance)  { // if the instance is not present 
            this.instance = new RedisManager(); // create a new instance
        }
        return this.instance; // return the instance
    }
    // send and await function with input as message to the engine
    public sendAndAwait(message: MessageToEngine) {
        // returns a promise object (of type Message from orderbook) that contains the Message from the order book after processing
        return new Promise<MessageFromOrderbook>((resolve) => {
            const id = this.getRandomClientId(); // create a random client id and subscribe to the pubsub on that id channel to know about the trades
            // subscribe to the pubsub to get the status of the order placed by the trader
            this.client.subscribe(id, (message) => { // subscribe to the redis channel
            // on receiving a message on the channel from the engine 
                this.client.unsubscribe(id);  // unsubscribe from the particular (id) channel
                resolve(JSON.parse(message)); // resolve the parsed string message received on the id channel from the engine into JSON
            });
            // push the data into the redis queue of the name "messages" from the api to be processed by engine
            this.publisher.lPush("messages", JSON.stringify({ clientId: id, message })); // push the message along with the data into the redis queue
        });
    }
    // create a random client id
    public getRandomClientId() { // create a random client id
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // return the random client Id
    }

}