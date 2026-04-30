import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase';
import { requireAuth, requireRole } from '../../middleware/auth';
import analyzeRouter from './analyze';
import shareRequestsRouter from './share-requests';

const router = Router();

router.use(requireAuth, requireRole('educator'));

router.get('/reviews', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('educator_reviews')
      .select('id, assignment_prompt, ai_policy, attention_level, report, created_at')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ reviews: data ?? [] });
  } catch (err) {
    console.error('List educator reviews error:', err);
    res.status(500).json({ error: 'Failed to fetch educator reviews.' });
  }
});

router.use('/analyze-submission', analyzeRouter);
router.use('/process-log-requests', shareRequestsRouter);

export default router;
