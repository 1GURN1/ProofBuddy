import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// User-scoped client — respects Row Level Security policies
export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

// Admin client — bypasses RLS for server-side operations (auth checks, usage enforcement, etc.)
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey);
