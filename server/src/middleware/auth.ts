import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { Role } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: Role };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: 'Invalid or expired session.' });
    return;
  }

  const { data: profile } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) {
    res.status(401).json({ error: 'User profile not found.' });
    return;
  }

  req.user = { id: user.id, email: user.email!, role: profile.role as Role };
  next();
}

export function requireRole(role: Role) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }
    if (req.user.role !== role) {
      res.status(403).json({ error: 'Access denied.' });
      return;
    }
    next();
  };
}
