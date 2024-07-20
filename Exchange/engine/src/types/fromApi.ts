
export const CREATE_ORDER = "CREATE_ORDER"; // create order type
export const CANCEL_ORDER = "CANCEL_ORDER"; // cancel order type
export const ON_RAMP = "ON_RAMP"; // onramp order type

export const GET_DEPTH = "GET_DEPTH"; // get depth type
export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS"; // get open order type


//TODO: Can we share the types between the api and the engine?
export type MessageFromApi = { // message from api
    type: typeof CREATE_ORDER, // create order type
    data: { // data from the api
        market: string, // trade market
        price: string, // price
        quantity: string, // quantity of trade
        side: "buy" | "sell", // side of trade
        userId: string // userId of the trade
    }
} | {
    type: typeof CANCEL_ORDER,  // cancel order type
    data: { // data for the cancel order
        orderId: string, // order id
        market: string, // market name
    }
} | {
    type: typeof ON_RAMP, // on ramp type
    data: { // data for the onramp type
        amount: string, // amount of the data
        userId: string, // id of the user
        txnId: string // tax id to get balance
    }
} | {
    type: typeof GET_DEPTH, // get depth type
    data: { // input data
        market: string, // market type
    }
} | {
    type: typeof GET_OPEN_ORDERS, // get open orders
    data: { // input data
        userId: string, // input userId
        market: string, // input market
    }
}