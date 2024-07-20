import { Order } from "../trade/Orderbook"; // import order type

export const CREATE_ORDER = "CREATE_ORDER"; // export create order type
export const CANCEL_ORDER = "CANCEL_ORDER"; // export cancel order type
export const ON_RAMP = "ON_RAMP"; // export on ramp order type

export const GET_DEPTH = "GET_DEPTH"; // export the get depth order type

export type MessageToApi = { // export the message to api type
    type: "DEPTH", // get the depth type
    payload: { // get the payload
        bids: [string, string][], // get the bids market depth 
        asks: [string, string][], // get the asks market depth
    }
} | {
    type: "ORDER_PLACED", // order placed type
    payload: { // payload
        orderId: string, // order Id
        executedQty: number, // executed quantity
        fills: { // the fills
            price: string, // price of the order
            qty: number, // quantity of the order
            tradeId: number // trade id of the order
        }[]
    }
} | {
    type: "ORDER_CANCELLED", // order cancelled
    payload: { // payload
        orderId: string, // order Id
        executedQty: number, // executed quantity
        remainingQty: number // remaining quantity
    }
} | {
    type: "OPEN_ORDERS", // open orders type
    payload: Order[] // payload are the number of open orders
}