import { Router } from "express"; // import router class
import { RedisManager } from "../RedisManager"; // import redis manager
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP, GET_OPEN_ORDERS } from "../types"; // import types

export const orderRouter = Router(); // create orderRouter object

orderRouter.post("/", async (req, res) => { // post route
    const { market, price, quantity, side, userId } = req.body; // destructure the body
    console.log({ market, price, quantity, side, userId }) // print the request body
    //TODO: can u make the type of the response object right? Right now it is a union.
    const response = await RedisManager.getInstance().sendAndAwait({ // send the order to the redis manager
        type: CREATE_ORDER, // type of order sent to redis manager
        data: { // body data sent to the redis manager
            market,
            price,
            quantity,
            side,
            userId
        }
    });
    res.json(response.payload);
});

orderRouter.delete("/", async (req, res) => {
    const { orderId, market } = req.body;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CANCEL_ORDER,
        data: {
            orderId,
            market
        }
    });
    res.json(response.payload);
});

orderRouter.get("/open", async (req, res) => {
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_OPEN_ORDERS,
        data: {
            userId: req.query.userId as string,
            market: req.query.market as string
        }
    });
    res.json(response.payload);
});