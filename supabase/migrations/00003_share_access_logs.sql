-- =============================================================================
-- 00003_share_access_logs.sql
-- Audit log for every pre-login process log share token lookup.
-- Written server-side via service role only. No user-facing read policies.
--
-- Logged fields per the share workflow design:
--   - share_id:     FK to the share record (nullable — set null if share deleted)
--   - ip_address:   raw IP of the requester
--   - token_prefix: first 8 chars of the token ONLY (never the full token)
--   - result:       one of success | expired | not_found | revoked
--   - created_at:   lookup timestamp
-- =============================================================================

create table share_access_logs (
  id            uuid        primary key default gen_random_uuid(),
  share_id      uuid        references process_log_shares(id) on delete set null,
  ip_address    text        not null,
  token_prefix  text        not null,
  result        text        not null
                check (result in ('success', 'expired', 'not_found', 'revoked')),
  created_at    timestamptz not null default now()
);

create index share_access_logs_share_id_idx   on share_access_logs(share_id);
create index share_access_logs_created_at_idx on share_access_logs(created_at);

-- RLS enabled but no user-facing policies.
-- Only the service role key (which bypasses RLS) can read or write this table.
alter table share_access_logs enable row level security;
