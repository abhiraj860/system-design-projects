// import the types of orders, depth and onramp
import { CANCEL_ORDER, CREATE_ORDER, GET_DEPTH, GET_OPEN_ORDERS, ON_RAMP } from "."

// create the types for message to engine as the data flows from the api to redis queue then to the engine
export type MessageToEngine = {
    type: typeof CREATE_ORDER, // create order type
    data: { // the body object
        market: string, // type of market for trade
        price: string, // price of the order
        quantity: string, // amount of stocks
        side: "buy" | "sell", // buy or sell side
        userId: string // user id
    }
} | {
    type: typeof CANCEL_ORDER, // type for order cancellation
    data: { // data object
        orderId: string, // input as orderId
        market: string, // market in which order to be cancelled
    }
} | {
    type: typeof ON_RAMP, // type for onramping that is adding balances
    data: { // data object
        amount: string, // amount for onramping
        userId: string, // userId name
        txnId: string // txnId for the bank details
    }
} | {
    type: typeof GET_DEPTH, // type to get depth
    data: { // data object
        market: string, // market name
    }
} | {
    type: typeof GET_OPEN_ORDERS, // type to get unfulfilled orders
    data: { // the data object
        userId: string, // userId which the user can get open orders
        market: string, // market to get the open orders
    }
}