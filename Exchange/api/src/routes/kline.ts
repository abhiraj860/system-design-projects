import { Client } from 'pg'; // import the sql client
import { Router } from "express"; // import the router from express

const pgClient = new Client({ // create a new client which is the pg client
    user: 'your_user', // user name
    host: 'localhost', // host name
    database: 'my_database', // database name
    password: 'your_password', // password
    port: 5432, // port
});
pgClient.connect(); // connect client to database

export const klineRouter = Router(); // create a kline router

klineRouter.get("/", async (req, res) => { // get route for kline
    const { market, interval, startTime, endTime } = req.query; // get the kline parameters of the chart from the URL

    let query; // query array
    switch (interval) { // insert an interval
        // get the data from resepective tables based on interval that were input
        case '1m': // 1 minute interval
            query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '1h': // 1 hour interval
            query = `SELECT * FROM klines_1m WHERE  bucket >= $1 AND bucket <= $2`;
            break;
        case '1w': // 1 week interval
            query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2`; 
            break;
        default:
            return res.status(400).send('Invalid interval'); // return an invalid interval
    }

    try {
        //@ts-ignore
        const result = await pgClient.query(query, [new Date(startTime * 1000 as string), new Date(endTime * 1000 as string)]); // get the data for the specific start and end time
        res.json(result.rows.map(x => ({ // get the arrays from query and apply map
            close: x.close, // show the closing price
            end: x.bucket, // show the end bucket
            high: x.high, // show the highes price
            low: x.low, // show the low price in the period
            open: x.open, // show the open price
            quoteVolume: x.quoteVolume, // show the quote volume
            start: x.start, // show the starting price 
            trades: x.trades, // show the trades
            volume: x.volume, // show the trade volume
        })));
    } catch (err) {
        console.log(err); // print out the error 
        res.status(500).send(err); // if error return the error
    }
});