import { BASE_CURRENCY } from "./Engine"; // import base current from the engine

export interface Order { // order type
    price: number; // price of each unit order
    quantity: number; // quantity of units
    orderId: string; // order ids of each order
    filled: number; // amount of quantity filled for the order placed the order
    side: "buy" | "sell";  // side of the order
    userId: string; // id of the user
}

export interface Fill { // Fill type interface
    price: string; // price of each of the asset
    qty: number; // quantity of the asset traded
    tradeId: number; // the trade Id 
    otherUserId: string; // the other user Id 
    markerOrderId: string; // the market OrderId
}

export class Orderbook { // Create orderbook class
    bids: Order[]; // bids (how much the trader is willing to pay)
    asks: Order[]; // asks (how the trader is willing to sell)
    baseAsset: string; // first asset in the pair
    quoteAsset: string = BASE_CURRENCY; // second asset in the pair
    lastTradeId: number; // tradeId of the last order 
    currentPrice: number; // current price of the asset

    // constructor for the orderbook class
    constructor(baseAsset: string, bids: Order[], asks: Order[], lastTradeId: number, currentPrice: number) {
        this.bids = bids; // for bids
        this.asks = asks; // for asks
        this.baseAsset = baseAsset; // for base asset
        this.lastTradeId = lastTradeId || 0; // last trade Id
        this.currentPrice = currentPrice ||0; // current price of the asset
    }

    ticker() { // this function is used to get the ticker "BTC_USD"
        return `${this.baseAsset}_${this.quoteAsset}`; // return the ticker
    }

    getSnapshot() { // to get the snapshot of the orderbook
        return {
            baseAsset: this.baseAsset, // base asset
            bids: this.bids, // what are the bids
            asks: this.asks, // what are the asks
            lastTradeId: this.lastTradeId, // what is the last trade id
            currentPrice: this.currentPrice // what is the current price of the base asset
        }
    }

    //TODO: Add self trade prevention
    addOrder(order: Order): { // add order method
        executedQty: number, // return an object of executedQty and
        fills: Fill[] // fills
    } {
        if (order.side === "buy") { // if the order side is buy that is bid
            const {executedQty, fills} = this.matchBid(order);  // try to match the bid and get the executed quantity 
            order.filled = executedQty; // set the order filled as the executed quantity
            if (executedQty === order.quantity) { // if the executed quantity and the order quanity is filled
                return { // return the executed quantity
                    executedQty, // return the executed quantity 
                    fills // return the fills
                }
            }
            this.bids.push(order); // if not add the newly order to the bids array as some of the orders are not filled
            return {
                executedQty, // return the executed quantity
                fills // return the fills
            }
        } else { // if the order is in the sell side
            const {executedQty, fills} = this.matchAsk(order); // the ask side need to be matched
            order.filled = executedQty; // set the order filled to the executed quantity
            if (executedQty === order.quantity) { // if the executed quantity is equal to the order quantity, this means that the order is satisfied
                return {
                    executedQty, // return the executed quantity
                    fills // return the fills
                }
            }
            this.asks.push(order); // else continue to push the left out order in the order array
            return {
                executedQty, // return the executed quantity
                fills // return the fills
            }
        }
    }

    matchBid(order: Order): {fills: Fill[], executedQty: number} { // used to match the bid with input as orders and output as Fills and executed Qty
        const fills: Fill[] = []; // fills array to the qty fills
        let executedQty = 0; // the executed quantity

        for (let i = 0; i < this.asks.length; i++) { // iterate through the asks array
            if (this.asks[i].price <= order.price && executedQty < order.quantity) { // if the asks price is less an equal to order price and executed quantity is less than order quantity
                // quantity filled with the current ask, it will the minimum of he order left or the quantity in the current asks
                const filledQty = Math.min((order.quantity - executedQty), this.asks[i].quantity);
                executedQty += filledQty; // add to the executed quantity
                this.asks[i].filled += filledQty; // add filled quantity for the particular asks
                fills.push({ // push to the flll
                    price: this.asks[i].price.toString(), // the price at which the fill occurred
                    qty: filledQty, // the amount of quantity filled
                    tradeId: this.lastTradeId++, // trade id is lastTrade++
                    otherUserId: this.asks[i].userId, // ask user id
                    markerOrderId: this.asks[i].orderId // ask maker order id
                });
            }
        }
        for (let i = 0; i < this.asks.length; i++) { // iterate through the asks length
            if (this.asks[i].filled === this.asks[i].quantity) { // if the filled and the quantity is same
                this.asks.splice(i, 1); // remove the asks from the array
                i--; // move on to the next elements in the array asks
            }
        }
        return {
            fills, // return the fills array 
            executedQty // return the executed quantity
        };
    }

    matchAsk(order: Order): {fills: Fill[], executedQty: number} { // this is used to match the ask
        const fills: Fill[] = []; // create the fills array
        let executedQty = 0; // initialize the executed qty
        
        for (let i = 0; i < this.bids.length; i++) { // iterate through the bids array length
            if (this.bids[i].price >= order.price && executedQty < order.quantity) { // if the bids price is greater than order price and executed quantity is less than order quantity
                const amountRemaining = Math.min(order.quantity - executedQty, this.bids[i].quantity); // remaining amount is the min on left and the bid quanitity
                executedQty += amountRemaining; // add the amount remaining to the executed quantity
                this.bids[i].filled += amountRemaining; // fill the bids side as that much amount got executed
                fills.push({ // push it to the fills
                    price: this.bids[i].price.toString(), // add the price to the fills
                    qty: amountRemaining, // add the quantity filled in the quantity
                    tradeId: this.lastTradeId++, // add the trade Id
                    otherUserId: this.bids[i].userId, // add the trade id whosoever put the bid
                    markerOrderId: this.bids[i].orderId // add the marketOrderId
                });
            }
        }
        for (let i = 0; i < this.bids.length; i++) { // iterate through the bids length
            if (this.bids[i].filled === this.bids[i].quantity) { // if the filled and the bid quantity is same
                this.bids.splice(i, 1); // remove the bid from the array
                i--; // decrement i
            }
        }
        return { // return the fills and executed quantity
            fills, // show the fills
            executedQty // show the executed quantity
        };
    }

    //TODO: Can you make this faster? Can you compute this during order matches?
    getDepth() { // function to get the depth 
        const bids: [string, string][] = []; // get the bids
        const asks: [string, string][] = []; // get the asks

        const bidsObj: {[key: string]: number} = {}; // create a bidsObject
        const asksObj: {[key: string]: number} = {}; // create an askobject

        for (let i = 0; i < this.bids.length; i++) { // run through the bids array
            const order = this.bids[i]; // get the order of every bids
            if (!bidsObj[order.price]) {  // if order price is not present 
                bidsObj[order.price] = 0; // make it 0
            }
            bidsObj[order.price] += order.quantity; //add the order quantity to the order price
        }

        for (let i = 0; i < this.asks.length; i++) { // run through the asks array
            const order = this.asks[i]; // get the order of evey asks
            if (!asksObj[order.price]) { // if the asks order price is null
                asksObj[order.price] = 0; // make it 0
            }
            asksObj[order.price] += order.quantity; // add the order quantity the order price
        }

        for (const price in bidsObj) { // for the price in bidsObj
            bids.push([price, bidsObj[price].toString()]); // push the price and bidsObjec
        }

        for (const price in asksObj) { // similary for the asksObj
            asks.push([price, asksObj[price].toString()]); // push the price and asksObject price 
        }

        return {
            bids, // return the bids
            asks // return the ask
        };
    }

    getOpenOrders(userId: string): Order[] { // function to get open orders from the user
        const asks = this.asks.filter(x => x.userId === userId); // filter the asks array with the userId
        const bids = this.bids.filter(x => x.userId === userId); // filter the bids array with the userId
        return [...asks, ...bids]; // spread the asks and bids and return it as array
    }

    cancelBid(order: Order) { // cancel bid function
        const index = this.bids.findIndex(x => x.orderId === order.orderId); // get the index from the bid array
        if (index !== -1) { // if bid is found
            const price = this.bids[index].price; // get the price fromt the bids
            this.bids.splice(index, 1); // remove the order from the bids array
            return price // return the price of the bid
        }
    }

    cancelAsk(order: Order) { // cancel ask function
        const index = this.asks.findIndex(x => x.orderId === order.orderId); // get the index from the asks array
        if (index !== -1) { // if ask is found
            const price = this.asks[index].price; // get the price from the ask array
            this.asks.splice(index, 1); // remove the asks array
            return price // return the price of the ask
        }
    }

}
