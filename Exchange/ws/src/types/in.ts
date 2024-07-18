// messages from the browser
export const SUBSCRIBE = "SUBSCRIBE"; // create subscribe type
export const UNSUBSCRIBE = "UNSUBSCRIBE"; // create unsubscribe type

export type SubscribeMessage = { // subscribe type message to subscribe to pubsub
    method: typeof SUBSCRIBE, // subscribe type
    params: string[] // parameters for subscribe message
}

export type UnsubscribeMessage = { // unsubscribe type message to unsubscribe from the pubsub
    method: typeof UNSUBSCRIBE, // unsubscribe type
    params: string[] // parameters for unsubscription message
}

export type IncomingMessage = SubscribeMessage | UnsubscribeMessage; 
// the above are the types for the subscribing and unsubscribing messages from the pubsub
// these message will come from the browser