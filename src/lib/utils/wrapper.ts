import { Router, Request, Response, NextFunction } from 'express';

type Wrapper = (router: Router) => void;

// Load all middleware with this function call
export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
