
import { Router } from "express"; // import router from express
import { RedisManager } from "../RedisManager"; // import redis manager
import { GET_DEPTH } from "../types"; // import the type for get_depth

export const depthRouter = Router(); // create a depth router

depthRouter.get("/", async (req, res) => { // get depth route
    const { symbol } = req.query; // get the market symbol from the query
    const response = await RedisManager.getInstance().sendAndAwait({ // send the request body and wait for the response
        type: GET_DEPTH, // type of operation to be performed
        data: { // data send to the redis queue to be processed by the engine
            market: symbol as string  // send the symbol as string in the response body
        }
    });

    res.json(response.payload); // get the response and send it as a client.
});
