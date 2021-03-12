/* Middleware's */
import { json, Router, urlencoded } from 'express';
// It allows the other domain or other address to access resource
import cors from 'cors';
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
// This middleware will never compress responses that include a Cache-Control header with the no-transform directive, as compressing will transform the body.
import compression from 'compression';
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import helmet from 'helmet';
//Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
import rateLimit from 'express-rate-limit';
/* Add more usefull middleware if needed */
