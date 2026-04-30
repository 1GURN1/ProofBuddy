import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase';

const router = Router();

// GET /api/student/process-log-requests
// Lists share requests directed at this student (by email or student_id).
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('process_log_shares')
      .select(`
        id, status, token, expires_at, approved_at, declined_at, revoked_at, created_at,
        educator_reviews ( id, assignment_prompt, ai_policy ),
        requester_id
      `)
      .or(`student_email.eq.${req.user!.email},student_id.eq.${req.user!.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Attach requester profile (educator name + institution) for display
    const shareIds = (data ?? []).map((s) => s.requester_id);
    const { data: educators } = shareIds.length
      ? await supabaseAdmin
          .from('users')
          .select('id, email, institutions(name)')
          .in('id', shareIds)
      : { data: [] };

    const educatorMap: Record<string, { email: string; institutionName?: string }> = {};
    for (const e of educators ?? []) {
      educatorMap[e.id] = {
        email: e.email,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        institutionName: (e.institutions as any)?.name,
      };
    }

    const enriched = (data ?? []).map((s) => ({
      ...s,
      requester: educatorMap[s.requester_id],
      status: s.status === 'pending' && new Date(s.expires_at) < new Date() ? 'expired' : s.status,
    }));

    res.json({ shareRequests: enriched });
  } catch (err) {
    console.error('List student share requests error:', err);
    res.status(500).json({ error: 'Failed to fetch share requests.' });
  }
});

// POST /api/student/process-log-requests/:shareId/approve
// Student selects a document to share. Snapshots the process log into the share record.
router.post('/:shareId/approve', async (req: Request, res: Response): Promise<void> => {
  try {
    const { documentId } = req.body;
    if (!documentId) {
      res.status(400).json({ error: 'documentId is required.' });
      return;
    }

    const { data: share } = await supabaseAdmin
      .from('process_log_shares')
      .select('id, status, student_email, student_id, expires_at')
      .eq('id', req.params.shareId)
      .maybeSingle();

    if (!share) {
      res.status(404).json({ error: 'Share request not found.' });
      return;
    }

    // Must be directed at this student
    if (
      share.student_email &&
      share.student_email.toLowerCase() !== req.user!.email.toLowerCase()
    ) {
      res.status(403).json({ error: 'This link was not sent to your account.' });
      return;
    }

    if (share.student_id && share.student_id !== req.user!.id) {
      res.status(403).json({ error: 'This link was not sent to your account.' });
      return;
    }

    if (share.status !== 'pending') {
      res.status(409).json({ error: `Share request is already ${share.status}.` });
      return;
    }

    if (new Date(share.expires_at) < new Date()) {
      res.status(410).json({ error: 'Share request has expired.' });
      return;
    }

    // Verify document belongs to student
    const { data: doc } = await supabaseAdmin
      .from('documents')
      .select('id')
      .eq('id', documentId)
      .eq('user_id', req.user!.id)
      .is('deleted_at', null)
      .maybeSingle();

    if (!doc) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    // Get the process log
    const { data: log } = await supabaseAdmin
      .from('process_logs')
      .select('id, events')
      .eq('document_id', documentId)
      .maybeSingle();

    const { error } = await supabaseAdmin
      .from('process_log_shares')
      .update({
        status: 'approved',
        student_id: req.user!.id,
        process_log_id: log?.id ?? null,
        snapshot_events: log?.events ?? [],
        approved_at: new Date().toISOString(),
      })
      .eq('id', req.params.shareId);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Approve share error:', err);
    res.status(500).json({ error: 'Failed to approve share request.' });
  }
});

// POST /api/student/process-log-requests/:shareId/decline
router.post('/:shareId/decline', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: share } = await supabaseAdmin
      .from('process_log_shares')
      .select('id, status, student_email, student_id')
      .eq('id', req.params.shareId)
      .maybeSingle();

    if (!share) {
      res.status(404).json({ error: 'Share request not found.' });
      return;
    }

    if (
      share.student_email &&
      share.student_email.toLowerCase() !== req.user!.email.toLowerCase()
    ) {
      res.status(403).json({ error: 'This link was not sent to your account.' });
      return;
    }

    if (share.student_id && share.student_id !== req.user!.id) {
      res.status(403).json({ error: 'This link was not sent to your account.' });
      return;
    }

    if (share.status !== 'pending') {
      res.status(409).json({ error: `Share request is already ${share.status}.` });
      return;
    }

    const { error } = await supabaseAdmin
      .from('process_log_shares')
      .update({ status: 'declined', student_id: req.user!.id, declined_at: new Date().toISOString() })
      .eq('id', req.params.shareId);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Decline share error:', err);
    res.status(500).json({ error: 'Failed to decline share request.' });
  }
});

// POST /api/student/process-log-requests/:shareId/revoke
// Student revokes a previously approved share. Clears the snapshot.
router.post('/:shareId/revoke', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: share } = await supabaseAdmin
      .from('process_log_shares')
      .select('id, status, student_id')
      .eq('id', req.params.shareId)
      .eq('student_id', req.user!.id)
      .maybeSingle();

    if (!share) {
      res.status(404).json({ error: 'Share request not found.' });
      return;
    }

    if (share.status !== 'approved') {
      res.status(409).json({ error: 'Only approved shares can be revoked.' });
      return;
    }

    const { error } = await supabaseAdmin
      .from('process_log_shares')
      .update({
        status: 'revoked',
        snapshot_events: null,
        revoked_at: new Date().toISOString(),
      })
      .eq('id', req.params.shareId);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Revoke share error:', err);
    res.status(500).json({ error: 'Failed to revoke share.' });
  }
});

export default router;
