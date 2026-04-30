import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import analyzeRouter from './analyze';

const router = Router();

// note: we will likely want to add auth and role checks here in the future since just for hackathon
// router.use(requireAuth, requireRole('educator'));

router.use('/analyze-submission', analyzeRouter);

// Phase 12: POST /api/educator/process-log-requests
//           GET  /api/educator/process-log-requests/:shareId
//           POST /api/educator/process-log-requests/:shareId/revoke

export default router;
