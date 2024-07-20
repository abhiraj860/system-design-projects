import { RedisClientType, createClient } from "redis"; // import the redis clien
import { ORDER_UPDATE, TRADE_ADDED } from "./types"; // import order update and trade added types
import { WsMessage } from "./types/toWs"; // import types from ws messages
import { MessageToApi } from "./types/toApi"; // import message to api

type DbMessage = { // create DbMessage type
    type: typeof TRADE_ADDED, // type is trade added
    data: { // data
        id: string, // id string
        isBuyerMaker: boolean, // is Buyermaker or not
        price: string, // price of each trade
        quantity: string, // quantity of each trade
        quoteQuantity: string, // amount of quantity traded
        timestamp: number, // time stamp
        market: string // market
    }
} | {
    type: typeof ORDER_UPDATE, // updated order
    data: { // data
        orderId: string, // order id
        executedQty: number, // executed quantity
        market?: string, // market
        price?: string, // price
        quantity?: string, // quantity
        side?: "buy" | "sell", // buy or sell side
    }
}

export class RedisManager { // redis manager class
    private client: RedisClientType; // redis client type
    private static instance: RedisManager; // instance of the redis manager

    constructor() { // constructor class
        this.client = createClient(); // create a client
        this.client.connect(); // connnect to the client
    }

    public static getInstance() { // create a singleton pattern
        if (!this.instance)  { // if the instance is not present
            this.instance = new RedisManager(); // create a new instance
        }
        return this.instance; // return the instance
    }
  
    public pushMessage(message: DbMessage) { // push messages to the db_processor
        this.client.lPush("db_processor", JSON.stringify(message)); // push to the redis queue of db_processor
    }

    public publishMessage(channel: string, message: WsMessage) { // publish message to websocket
        this.client.publish(channel, JSON.stringify(message)); // publish the message to websocket
    }

    public sendToApi(clientId: string, message: MessageToApi) { // send the message to api through api
        this.client.publish(clientId, JSON.stringify(message)); // publish the message to pubsub
    }
}