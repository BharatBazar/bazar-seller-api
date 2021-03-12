export const configCors = {
    // Allow your domains to restrict ill apis.
    allowOrigin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8081'],
    // Expose additional which are restricted.
    exposedHeaders: ['X-Auth'],
};

export const rateLimitConfig = {
    inTime: process.env.REQUEST_TIME || 60 * 1000,
    maxRequest: process.env.MAX_REQUEST || 60,
};
