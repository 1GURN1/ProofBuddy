import { Request, Response, NextFunction } from 'express';
import { Role } from '../types';

// req.user is populated by requireAuth after JWT verification
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: Role };
    }
  }
}

// Phase 3: verify Supabase JWT, extract user + role, attach to req.user
export function requireAuth(_req: Request, _res: Response, next: NextFunction): void {
  next();
}

// Phase 3: gate a route to a specific role (call after requireAuth)
export function requireRole(_role: Role) {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    next();
  };
}
