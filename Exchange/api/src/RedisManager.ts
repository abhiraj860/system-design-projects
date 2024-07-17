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
        return new Promise<MessageFromOrderbook>((resolve) => {
            const id = this.getRandomClientId();
            this.client.subscribe(id, (message) => {
                this.client.unsubscribe(id);
                resolve(JSON.parse(message));
            });
            this.publisher.lPush("messages", JSON.stringify({ clientId: id, message }));
        });
    }
    // create a random client id
    public getRandomClientId() { // create a random client id
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // return the random client Id
    }

}