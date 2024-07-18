// messages to the browser

export type TickerUpdateMessage = { // get the ticker messages from the pubsub
    type: "ticker", // type is ticker
    data: {
        c?: string,
        h?: string,
        l?: string,
        v?: string,
        V?: string,
        s?: string,
        id: number,
        e: "ticker"
    }
} 

export type DepthUpdateMessage = { // get the update messages from the pubsub
    type: "depth", // type is depth
    data: { // data for depth update messages
        b?: [string, string][], // array of strings for the bids
        a?: [string, string][], // array of strings for the asks
        id: number, // the id number
        e: "depth" // the depth identifier
    }
}

export type OutgoingMessage = TickerUpdateMessage | DepthUpdateMessage; 
// the above are the two types for the outgoing messages to the browser