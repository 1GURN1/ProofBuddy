import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import analyzeRouter from './analyze';
import shareRequestsRouter from './share-requests';

const router = Router();

router.use(requireAuth, requireRole('educator'));

router.use('/analyze-submission', analyzeRouter);
router.use('/process-log-requests', shareRequestsRouter);

export default router;
