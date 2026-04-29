import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase';

const router = Router();

// POST /api/educator/process-log-requests
// Create a share request tied to an existing educator review.
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { educatorReviewId, studentEmail, expiresInDays = 30 } = req.body;

    if (!educatorReviewId) {
      res.status(400).json({ error: 'educatorReviewId is required.' });
      return;
    }

    // Verify the review belongs to this educator
    const { data: review } = await supabaseAdmin
      .from('educator_reviews')
      .select('id')
      .eq('id', educatorReviewId)
      .eq('user_id', req.user!.id)
      .maybeSingle();

    if (!review) {
      res.status(404).json({ error: 'Review not found.' });
      return;
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Math.min(expiresInDays, 90));

    const { data, error } = await supabaseAdmin
      .from('process_log_shares')
      .insert({
        educator_review_id: educatorReviewId,
        requester_id: req.user!.id,
        student_email: studentEmail ?? null,
        expires_at: expiresAt.toISOString(),
      })
      .select('id, token, status, student_email, expires_at, created_at')
      .single();

    if (error) throw error;
    res.status(201).json({ shareRequest: data });
  } catch (err) {
    console.error('Create share request error:', err);
    res.status(500).json({ error: 'Failed to create share request.' });
  }
});

// GET /api/educator/process-log-requests
// List all share requests created by this educator.
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('process_log_shares')
      .select('id, token, status, student_email, student_id, expires_at, approved_at, created_at, educator_review_id')
      .eq('requester_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ shareRequests: data });
  } catch (err) {
    console.error('List share requests error:', err);
    res.status(500).json({ error: 'Failed to fetch share requests.' });
  }
});

// GET /api/educator/process-log-requests/:shareId
// Get a single share request. If approved, includes the process log snapshot.
router.get('/:shareId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('process_log_shares')
      .select('id, status, student_email, student_id, token, expires_at, approved_at, revoked_at, snapshot_events, educator_review_id, created_at')
      .eq('id', req.params.shareId)
      .eq('requester_id', req.user!.id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: 'Share request not found.' });
      return;
    }

    // Check runtime expiry (status field may lag)
    const isExpired = data.status === 'pending' && new Date(data.expires_at) < new Date();

    res.json({
      shareRequest: {
        ...data,
        status: isExpired ? 'expired' : data.status,
        // Only expose snapshot if approved and not expired/revoked
        snapshot_events:
          data.status === 'approved' && !isExpired ? data.snapshot_events : undefined,
      },
    });
  } catch (err) {
    console.error('Get share request error:', err);
    res.status(500).json({ error: 'Failed to fetch share request.' });
  }
});

export default router;
