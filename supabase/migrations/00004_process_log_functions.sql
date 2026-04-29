-- =============================================================================
-- 00004_process_log_functions.sql
-- Postgres function for atomic process log event appending.
--
-- Called server-side via supabaseAdmin.rpc('append_process_log_events', {...})
-- Uses INSERT ... ON CONFLICT so a single call creates the log if it doesn't
-- exist yet, or appends to it if it does — no fetch-then-update race condition.
-- =============================================================================

create or replace function append_process_log_events(
  p_document_id uuid,
  p_events      jsonb
)
returns void
language plpgsql
security definer
as $$
begin
  insert into process_logs (document_id, events)
  values (p_document_id, p_events)
  on conflict (document_id)
  do update set
    events     = process_logs.events || p_events,
    updated_at = now();
end;
$$;
