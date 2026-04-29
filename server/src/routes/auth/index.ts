import { Router, Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../../config/supabase';
import { requireAuth } from '../../middleware/auth';
import { extractDomain, deriveInstitutionName } from '../../utils';

const router = Router();

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role, institutionName } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({ error: 'email, password, and role are required.' });
      return;
    }

    if (!['student', 'educator'].includes(role)) {
      res.status(400).json({ error: 'role must be student or educator.' });
      return;
    }

    let institutionId: string | null = null;

    if (role === 'educator') {
      const domain = extractDomain(email);

      const { data: blocked } = await supabaseAdmin
        .from('blocked_email_domains')
        .select('domain')
        .eq('domain', domain)
        .maybeSingle();

      if (blocked) {
        res.status(400).json({ error: 'Educators must use an institutional email address.' });
        return;
      }

      const { data: existing } = await supabaseAdmin
        .from('institutions')
        .select('id')
        .eq('domain', domain)
        .maybeSingle();

      if (existing) {
        institutionId = existing.id;
      } else {
        const name = institutionName || deriveInstitutionName(domain);
        const { data: created, error: instError } = await supabaseAdmin
          .from('institutions')
          .insert({ domain, name })
          .select('id')
          .single();

        if (instError || !created) {
          res.status(500).json({ error: 'Failed to create institution record.' });
          return;
        }

        institutionId = created.id;
      }
    }

    // email_confirm: true skips confirmation email — acceptable for hackathon
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      const msg = authError?.message ?? '';
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already been registered')) {
        res.status(409).json({ error: 'An account with this email already exists.' });
      } else {
        res.status(500).json({ error: msg || 'Signup failed.' });
      }
      return;
    }

    const { error: profileError } = await supabaseAdmin.from('users').insert({
      id: authData.user.id,
      email,
      role,
      institution_id: institutionId,
    });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      res.status(500).json({ error: 'Failed to create user profile.' });
      return;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (sessionError || !sessionData.session) {
      // Account exists — just tell them to sign in
      res.status(201).json({ message: 'Account created. Please sign in.' });
      return;
    }

    res.status(201).json({
      user: { id: authData.user.id, email, role, institutionId },
      session: {
        accessToken: sessionData.session.access_token,
        refreshToken: sessionData.session.refresh_token,
        expiresAt: sessionData.session.expires_at,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Signup failed.' });
  }
});

// POST /api/auth/signin
router.post('/signin', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required.' });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('role, institution_id')
      .eq('id', data.user.id)
      .single();

    res.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        role: profile?.role,
        institutionId: profile?.institution_id,
      },
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
      },
    });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Sign in failed.' });
  }
});

// POST /api/auth/signout
router.post('/signout', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')!;
    await supabaseAdmin.auth.admin.signOut(token);
    res.json({ success: true });
  } catch (err) {
    // Best effort — client should discard the token regardless
    res.json({ success: true });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('id, email, role, institution_id, created_at, institutions(id, domain, name)')
      .eq('id', req.user!.id)
      .single();

    res.json({ user: profile });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

export default router;
