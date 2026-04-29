import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase';
import { requireAuth, requireRole } from '../../middleware/auth';
import { ProcessLogEvent } from '../../types';
import analyzeRouter from './analyze';

const router = Router();

router.use(requireAuth, requireRole('student'));

router.use('/analyze', analyzeRouter);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

// Returns the document only if it belongs to userId and isn't deleted.
// Uses maybeSingle so "not found" returns null instead of an error.
async function getOwnedDocument(documentId: string, userId: string) {
  return supabaseAdmin
    .from('documents')
    .select('*')
    .eq('id', documentId)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .maybeSingle();
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

// GET /api/student/documents
router.get('/documents', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documents')
      .select('id, title, word_count, is_esl, created_at, updated_at')
      .eq('user_id', req.user!.id)
      .is('deleted_at', null)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    res.json({ documents: data });
  } catch (err) {
    console.error('List documents error:', err);
    res.status(500).json({ error: 'Failed to fetch documents.' });
  }
});

// POST /api/student/documents
router.post('/documents', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title = 'Untitled Document', content = '', is_esl = false } = req.body;

    const { data, error } = await supabaseAdmin
      .from('documents')
      .insert({
        user_id: req.user!.id,
        title,
        content,
        is_esl,
        word_count: countWords(content),
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ document: data });
  } catch (err) {
    console.error('Create document error:', err);
    res.status(500).json({ error: 'Failed to create document.' });
  }
});

// GET /api/student/documents/:id
router.get('/documents/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await getOwnedDocument(req.params.id, req.user!.id);

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    res.json({ document: data });
  } catch (err) {
    console.error('Get document error:', err);
    res.status(500).json({ error: 'Failed to fetch document.' });
  }
});

// PATCH /api/student/documents/:id
// Accepts: title, content, is_esl — any subset.
// word_count is always recomputed server-side when content changes.
router.patch('/documents/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: existing, error: fetchError } = await getOwnedDocument(
      req.params.id,
      req.user!.id
    );

    if (fetchError) throw fetchError;
    if (!existing) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    const { title, content, is_esl } = req.body;
    const updates: Record<string, unknown> = {};

    if (title !== undefined) updates.title = title;
    if (content !== undefined) {
      updates.content = content;
      updates.word_count = countWords(content);
    }
    if (is_esl !== undefined) updates.is_esl = is_esl;

    if (Object.keys(updates).length === 0) {
      res.json({ document: existing });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('documents')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', req.user!.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ document: data });
  } catch (err) {
    console.error('Update document error:', err);
    res.status(500).json({ error: 'Failed to update document.' });
  }
});

// DELETE /api/student/documents/:id — soft delete
router.delete('/documents/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: existing, error: fetchError } = await getOwnedDocument(
      req.params.id,
      req.user!.id
    );

    if (fetchError) throw fetchError;
    if (!existing) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    const { error } = await supabaseAdmin
      .from('documents')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .eq('user_id', req.user!.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Delete document error:', err);
    res.status(500).json({ error: 'Failed to delete document.' });
  }
});

// ---------------------------------------------------------------------------
// Versions
// ---------------------------------------------------------------------------

// GET /api/student/documents/:id/versions
// Returns metadata only — content is not included in the list for performance.
router.get('/documents/:id/versions', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: doc, error: fetchError } = await getOwnedDocument(
      req.params.id,
      req.user!.id
    );

    if (fetchError) throw fetchError;
    if (!doc) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('document_versions')
      .select('id, word_count, created_at')
      .eq('document_id', req.params.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ versions: data });
  } catch (err) {
    console.error('List versions error:', err);
    res.status(500).json({ error: 'Failed to fetch versions.' });
  }
});

// POST /api/student/documents/:id/versions
// Called by the client on debounced auto-save. Snapshots current document content.
router.post('/documents/:id/versions', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: doc, error: fetchError } = await getOwnedDocument(
      req.params.id,
      req.user!.id
    );

    if (fetchError) throw fetchError;
    if (!doc) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('document_versions')
      .insert({
        document_id: doc.id,
        content: doc.content,
        word_count: doc.word_count,
      })
      .select('id, word_count, created_at')
      .single();

    if (error) throw error;
    res.status(201).json({ version: data });
  } catch (err) {
    console.error('Create version error:', err);
    res.status(500).json({ error: 'Failed to create version.' });
  }
});

// ---------------------------------------------------------------------------
// Process Log
// ---------------------------------------------------------------------------

// POST /api/student/documents/:id/process-log/events
// Client batches and sends every 10 seconds or 50 events (whichever comes first).
// Atomically appended via Postgres function — no fetch-then-update race.
router.post(
  '/documents/:id/process-log/events',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { data: doc, error: fetchError } = await getOwnedDocument(
        req.params.id,
        req.user!.id
      );

      if (fetchError) throw fetchError;
      if (!doc) {
        res.status(404).json({ error: 'Document not found.' });
        return;
      }

      const { events } = req.body;

      if (!Array.isArray(events)) {
        res.status(400).json({ error: 'events must be an array.' });
        return;
      }

      if (events.length === 0) {
        res.json({ success: true, eventCount: 0 });
        return;
      }

      if (events.length > 100) {
        res.status(400).json({ error: 'Maximum 100 events per batch.' });
        return;
      }

      // Validate each event has the minimum required fields
      for (const event of events as ProcessLogEvent[]) {
        if (typeof event.type !== 'string' || typeof event.timestamp !== 'number') {
          res.status(400).json({ error: 'Each event must have type (string) and timestamp (number).' });
          return;
        }
      }

      const { error } = await supabaseAdmin.rpc('append_process_log_events', {
        p_document_id: doc.id,
        p_events: JSON.stringify(events),
      });

      if (error) throw error;
      res.json({ success: true, eventCount: events.length });
    } catch (err) {
      console.error('Process log ingest error:', err);
      res.status(500).json({ error: 'Failed to store process log events.' });
    }
  }
);

// GET /api/student/documents/:id/process-log
// Returns the full event array for the replay viewer.
// Events can be large (10k–25k for a full essay) — intentional per spec.
router.get(
  '/documents/:id/process-log',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { data: doc, error: fetchError } = await getOwnedDocument(
        req.params.id,
        req.user!.id
      );

      if (fetchError) throw fetchError;
      if (!doc) {
        res.status(404).json({ error: 'Document not found.' });
        return;
      }

      const { data, error } = await supabaseAdmin
        .from('process_logs')
        .select('id, document_id, events, created_at, updated_at')
        .eq('document_id', doc.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        res.json({ processLog: null });
        return;
      }

      res.json({ processLog: data });
    } catch (err) {
      console.error('Get process log error:', err);
      res.status(500).json({ error: 'Failed to fetch process log.' });
    }
  }
);

export default router;
