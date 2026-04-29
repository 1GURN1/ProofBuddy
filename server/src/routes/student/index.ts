import { Router } from 'express';

const router = Router();

// Phase 6:  GET/POST/PATCH/DELETE /api/student/documents
//           GET /api/student/documents/:id/versions
// Phase 7:  POST /api/student/documents/:id/process-log/events (batch ingest)
//           GET  /api/student/documents/:id/process-log
// Phase 10: POST /api/student/analyze

export default router;
