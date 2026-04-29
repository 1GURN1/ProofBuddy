import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import analyzeRouter from './analyze';

const router = Router();

router.use(requireAuth, requireRole('educator'));

router.use('/analyze-submission', analyzeRouter);

// Phase 12: POST /api/educator/process-log-requests
//           GET  /api/educator/process-log-requests/:shareId
//           POST /api/educator/process-log-requests/:shareId/revoke

export default router;
