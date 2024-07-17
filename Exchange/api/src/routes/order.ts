import { Router } from "express"; // import router class
import { RedisManager } from "../RedisManager"; // import redis manager
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP, GET_OPEN_ORDERS } from "../types"; // import types

export const orderRouter = Router(); // order route object

orderRouter.post("/", async (req, res) => { // create order route
    const { market, price, quantity, side, userId } = req.body; // destructure the body
    console.log({ market, price, quantity, side, userId }) // print the request body
    //TODO: can u make the type of the response object right? Right now it is a union.
    const response = await RedisManager.getInstance().sendAndAwait({ // send the order to the redis manager
        type: CREATE_ORDER, // type of order sent to redis manager
        data: { // body data sent to the redis queue
            market, // order market
            price, // price of order
            quantity, // quantity of order
            side, // side of order (Buy or Sell)
            userId // id of the user
        }
    });
    res.json(response.payload); // response to the client
});

orderRouter.delete("/", async (req, res) => { // delete order route
    const { orderId, market } = req.body; // get the delete order body request from orderId
    const response = await RedisManager.getInstance().sendAndAwait({ // send the order body to the redis queue and subscribe to the pubsub
        type: CANCEL_ORDER, // type of the order request
        data: { // data sent to the body
            orderId, // orderId that needs to delete the order
            market // the market in which the order needs to delete
        }
    });
    res.json(response.payload); // reponse to the client
});

orderRouter.get("/open", async (req, res) => { // route to get the open orders
    const response = await RedisManager.getInstance().sendAndAwait({ // get the open orders in the market
        type: GET_OPEN_ORDERS, // type of the order request
        data: { // data sent into the body request
            userId: req.query.userId as string, // get the userId from the url
            market: req.query.market as string // get the market from the url
        }
    });
    res.json(response.payload); // response to the client
});