/* Middleware's */
import { Router } from 'express';
// It allows the other custom domain or other address to access resource outside the domain from which the first resource was served.
import cors from 'cors';
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
// This middleware will never compress responses that include a Cache-Control header with the no-transform directive, as compressing will transform the body.
import compression from 'compression';
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import helmet from 'helmet';
//Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
import rateLimit from 'express-rate-limit';
// calling body-parser to handle the Request Object from POST requests
import bodyParser from 'body-parser';
/* Add more usefull middleware if needed */

import { requestLogger } from './requestLogger';

import { configCors, rateLimitConfig } from '../config';

export const useHelmet = (router: Router) => {
    router.use(helmet());
};

export const allowCors = (router: Router) => {
    router.use(
        cors({
            origin(origin, callback) {
                if (!origin) {
                    return callback(null, true);
                }
                if (configCors.allowOrigin.indexOf(origin) === -1) {
                    const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
            exposedHeaders: configCors.exposedHeaders,
            // To enable HTTP cookies over CORS
            // credentials: true,
        }),
    );
};

export const handleBodyRequestParsing = (router: Router) => {
    // parse incoming Request Object if object, with nested objects, or generally any type.
    router.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    // parse application/json, basically parse incoming Request Object as a JSON Object
    router.use(bodyParser.json({ limit: '10mb' }));
};

// Logging all request in console.
export const reqConsoleLogger = (router: Router) => {
    router.use(requestLogger);
};

// Compress the payload and send through api
export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const requestLimiter = (router: Router) => {
    // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // see https://expressjs.com/en/guide/behind-proxies.html
    // app.set('trust proxy', 1);s
    const limiter: rateLimit.RateLimit = new rateLimit({
        windowMs: +rateLimitConfig.inTime, // 1 minutes
        max: +rateLimitConfig.maxRequest, // limit each IP to 12 requests per windowMs,
        message: {
            status: 0,
            error: 'Too Many Requests',
            statusCode: 429,
            message: 'Oh boy! You look in hurry, take it easy',
            description: 'You have crossed maximum number of requests. please wait and try again.',
        },
    });
    router.use(limiter);
};
