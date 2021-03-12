import express from 'express';
import { log } from 'util';
const app: express.Application = express();

// Applying all middleware
import { applyMiddleware } from './lib/utils/wrapper';
import middleware from './middleware/common.middleware';
applyMiddleware(middleware, app);

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

app.listen(PORT, () => {
    log('Listening on port ' + PORT);
});
