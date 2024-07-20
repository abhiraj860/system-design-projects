//TODO: Can we share the types between the ws layer and the engine?

export type TickerUpdateMessage = { // get the ticker update message
    stream: string,  // stream is string
    data: { // data for the ticker message
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

export type DepthUpdateMessage = { // depth update message
    stream: string, // stream is string
    data: { // data type
        b?: [string, string][], // the bids
        a?: [string, string][], // the asks
        e: "depth" // depth
    }
}

export type TradeAddedMessage = { // trade added message
    stream: string, // add stream
    data: { // data type
        e: "trade", 
        t: number,
        m: boolean,
        p: string,
        q: string,
        s: string, // symbol
    }
}
// type to the web socket message
export type WsMessage = TickerUpdateMessage | DepthUpdateMessage | TradeAddedMessage;
