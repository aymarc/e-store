import { } from 'dotenv/config' // module
import express from "express";
//import RedisStore from "./utils/redis.mjs";
import db from "./utils/db.mjs";
import Middleware from "./utils/middleware.mjs";
import routes from "./routes.mjs";
import config from './config.mjs';

const app = express();
const node_env = config.NODE_ENV;
const api_version = config.API_VERSION;
const middleware = new Middleware(app, node_env, api_version);
const engine = "ejs";
const assetsDir = "public";
const uploadedFileDir = "uploads";
//const redisStore = new RedisStore();

//initialize view with ejs
middleware.initializeView(engine);

//initialize public directory
middleware.useAsStatic(assetsDir);
middleware.useAsStatic(uploadedFileDir);

//print the request object in development
middleware.report();

routes(app, api_version);

//handle errors and send feedback to user
middleware.catchError();

//handle request that don't match any route:send a 404 NOT FOUND to user
middleware.catchRequestWithNoMatch();

(async () => {
    try {
        await db.sync();
        //await redisStore.connectRedis();
        app.listen(config.PORT || 8000, () => {
            console.log(`=======Server running on port ${config.PORT || 8000}========\n\n`);
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
})();
