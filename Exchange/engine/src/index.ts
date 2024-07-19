import { createClient, } from "redis"; // import createClient from redis
import { Engine } from "./trade/Engine"; // import engine class from trade/engine


async function main() { // main function
    const engine = new Engine(); // create an engine class
    const redisClient = createClient(); // create a redis client
    await redisClient.connect(); // client to the redis client
    console.log("connected to redis");  // log the message

    // start popping messages from the redis queue
    while (true) { // start an infinite loop
        const response = await redisClient.rPop("messages" as string) // get the message from the redis client
        if (!response) { // if we do not get a response
                        // don't do any thing
        }  else { // if we get a response which is a message
            engine.process(JSON.parse(response)); // process the response in the engine
        }        
    }

}

main(); // declare the main function