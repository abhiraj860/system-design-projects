import express from "express"; // import express
import cors from "cors"; // import cors
import { orderRouter } from "./routes/order"; // import order router
import { depthRouter } from "./routes/depth"; // import depth router
import { tradesRouter } from "./routes/trades"; // import trades router
import { klineRouter } from "./routes/kline"; // import kline router
import { tickersRouter } from "./routes/ticker"; // import tickers router

const app = express(); // create an app
app.use(cors()); // use the core middleware
app.use(express.json()); // use the parse data middleware

app.use("/api/v1/order", orderRouter); // order router
app.use("/api/v1/depth", depthRouter); // depth router
app.use("/api/v1/trades", tradesRouter); // trades router
app.use("/api/v1/klines", klineRouter); // kline router
app.use("/api/v1/tickers", tickersRouter); // ticker router


app.listen(3000, () => {
    console.log("Server is running on port 3000"); // app listens on port 3000
});