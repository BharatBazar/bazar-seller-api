import { Router, Request, Response, NextFunction } from 'express';
import { Authorization, RoleAuthorization, AdminAuthorization } from '../middleware/auth.middleware';

type Wrapper = (router: Router) => void;

// Load all middleware with this function call
export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

/* Handles all type of api requests. */

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;
export interface IRoute {
    path: string | string[];
    method: string;
    role?: string;
    escapeAuth?: boolean;
    adminOnly?: boolean;
    handler: Handler[];
}

// loading all routes and initialize to use them.
export const applyRoutes = (routes: IRoute[], router: Router) => {
    for (const route of routes) {
        const { method, path, escapeAuth, handler, adminOnly, role } = route;
        if (escapeAuth) {
            (router as any)[method](path, handler);
        } else if (role) {
            (router as any)[method](path, [Authorization, RoleAuthorization(role), ...handler]);
        } else if (adminOnly) {
            (router as any)[method](path, [Authorization, AdminAuthorization, ...handler]);
        } else {
            (router as any)[method](path, [Authorization, ...handler]);
        }
    }
    return router;
};
