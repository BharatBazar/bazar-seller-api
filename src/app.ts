import express from 'express';
import { log } from 'util';

/* Error Handlers */
// These error handlers will caught any unhandled exceptions or rejections
// and do not stop the process with zero.
process.on('uncaughtException', (e) => {
    console.log(e.message, 'uncaught');
    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    console.log(e, 'unhandled');
    process.exit(1);
});

//Initializing express app
const app: express.Application = express();

// Initializing middleware
import { applyMiddleware } from './lib/utils/wrapper';

import middleware from './middleware/common.middleware';
import errorMiddleware from './middleware/error.middleware';

applyMiddleware(middleware, app);

/*---------------------------------------
| API VERSIONS CONFIGURATION [START]
|---------------------------------------*/

// Different router required to initialize different apis call.

/*---------------------------------------
| API VERSIONS CONFIGURATION [END]
|---------------------------------------*/

//Error middleware

applyMiddleware(errorMiddleware, app);
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

app.listen(PORT, () => {
    log('Listening on port ' + PORT);
});
