
import { Router } from "express"; // import router from express

export const tickersRouter = Router(); // create a tickerRouter route

tickersRouter.get("/", async (req, res) => { // get ticker route request
    res.json({}); // response json
});