// This folder contains types for the messages front the order book
export const CREATE_ORDER = "CREATE_ORDER"; // create order type
export const CANCEL_ORDER = "CANCEL_ORDER"; // cancel order type
export const ON_RAMP = "ON_RAMP"; // money on_ramp type
export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS"; // get open orders type

// Note: for every order placed there is an orderId genereated for that particular order.

export const GET_DEPTH = "GET_DEPTH"; // get_depth type

// type for the messages from the orderbook
export type MessageFromOrderbook = {
    type: "DEPTH", // depth type
    payload: { // payload from the order book
        market: string, // market type
        bids: [string, string][], // all bids summary
        asks: [string, string][], // all asks summary
    }
} | {
    type: "ORDER_PLACED", // order placed type
    payload: { // payload from the order book
        orderId: string, // orderId of the order placed
        executedQty: number, // executed quantity of the order placed
        fills: [ // breakdown of how the order got fullfilled, it is an array
            {
                price: string, // price of each order fullfilled
                qty: number, // quantity of order fullfilled at this price
                tradeId: number // tradeId of the order
            }
        ]
    }
} | {
    type: "ORDER_CANCELLED", // for order cancellation
    payload: { // payload from the orderbook or engine
        orderId: string, // order Id
        executedQty: number, // how many orders got cancelled
        remainingQty: number // remaining quantity not cancelled
    }
} | {
    type: "OPEN_ORDERS", // orders sitting on the order book
    payload: { // payload from the order book
        orderId: string, // order Id 
        executedQty: number, // how many quantity is sitting on the order book
        price: string, // price of each order on the orderbook
        quantity: string, // quantity of each order in the orderbook
        side: "buy" | "sell", // buy or sell side of the order book
        userId: string // the userId whose open order refers to
    }[]
}