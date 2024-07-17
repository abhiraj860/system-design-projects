import { Router } from "express"; // import router from express

export const tradesRouter = Router(); // make a get trade route

tradesRouter.get("/", async (req, res) => { // get trade route
    const { market } = req.query; // get the query from the url in the market
    // get from DB
    res.json({}); // send the response to the client in json format
})
