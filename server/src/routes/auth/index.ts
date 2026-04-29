import { Router } from 'express';

const router = Router();

// Phase 3:
//   POST /api/auth/signup  — create account, enforce .edu/institutional check for educators
//   POST /api/auth/signin  — exchange credentials for Supabase session
//   POST /api/auth/signout — invalidate session
//   GET  /api/auth/me      — return current user + role

export default router;
