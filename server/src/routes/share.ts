// =============================================================================
// GET /api/share/:token  — public, pre-login token lookup
//
// No auth required. Uses service role to look up the share by token.
// Returns ONLY: educator email, institution name, assignment preview,
//   created_at, expires_at, shareId.
// Never returns: snapshot_events, full submission text, educator email details,
//   or any data beyond what's needed to render the consent screen.
//
// Every lookup is logged to share_access_logs (IP + token prefix + result).
// Returns a generic error for invalid/expired/revoked tokens — never leaks
// whether the token was malformed, not found, or expired.
// =============================================================================

import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

async function logAccess(
  req: Request,
  shareId: string | null,
  tokenPrefix: string,
  result: 'success' | 'expired' | 'not_found' | 'revoked'
) {
  await supabaseAdmin.from('share_access_logs').insert({
    share_id: shareId,
    ip_address: req.ip ?? 'unknown',
    token_prefix: tokenPrefix,
    result,
  });
}

router.get('/:token', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;
  const tokenPrefix = token.slice(0, 8);
  const genericError = 'Invalid or expired link.';

  try {
    const { data: share } = await supabaseAdmin
      .from('process_log_shares')
      .select(`
        id, status, expires_at, created_at,
        educator_reviews ( assignment_prompt ),
        requester_id
      `)
      .eq('token', token)
      .maybeSingle();

    if (!share) {
      await logAccess(req, null, tokenPrefix, 'not_found');
      res.status(404).json({ error: genericError });
      return;
    }

    if (share.status === 'revoked') {
      await logAccess(req, share.id, tokenPrefix, 'revoked');
      res.status(410).json({ error: genericError });
      return;
    }

    const isExpired =
      share.status === 'expired' ||
      (share.status === 'pending' && new Date(share.expires_at) < new Date());

    if (isExpired) {
      await logAccess(req, share.id, tokenPrefix, 'expired');
      res.status(410).json({ error: genericError });
      return;
    }

    // Fetch educator profile (email + institution) separately
    const { data: educator } = await supabaseAdmin
      .from('users')
      .select('email, institutions(name)')
      .eq('id', share.requester_id)
      .single();

    await logAccess(req, share.id, tokenPrefix, 'success');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const review = share.educator_reviews as any;
    const assignmentPreview = typeof review?.assignment_prompt === 'string'
      ? review.assignment_prompt.slice(0, 120) + (review.assignment_prompt.length > 120 ? '…' : '')
      : null;

    res.json({
      shareId: share.id,
      preview: {
        educatorEmail: educator?.email ?? null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        institutionName: (educator?.institutions as any)?.name ?? null,
        assignmentPreview,
        createdAt: share.created_at,
        expiresAt: share.expires_at,
        status: share.status,
      },
    });
  } catch (err) {
    console.error('Share token lookup error:', err);
    // Don't leak internal errors — return the generic message
    res.status(500).json({ error: genericError });
  }
});

export default router;
