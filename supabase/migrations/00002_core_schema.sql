-- =============================================================================
-- 00002_core_schema.sql
-- Core application tables: institutions, users, documents, process logs,
-- analyses, educator reviews, process log shares, usage tracking.
-- =============================================================================

create extension if not exists "pgcrypto";

-- Reusable trigger function: stamps updated_at on every UPDATE
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================================================
-- INSTITUTIONS
-- Auto-created from email domain at educator signup.
-- verified = false for all auto-created records (manual verification later).
-- =============================================================================
create table institutions (
  id          uuid        primary key default gen_random_uuid(),
  domain      text        not null unique,
  name        text        not null,
  verified    boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger institutions_updated_at
  before update on institutions
  for each row execute function update_updated_at();

-- =============================================================================
-- USERS
-- Extends auth.users with app-specific data.
-- Created server-side on signup; one row per Supabase Auth user.
-- institution_id: set for educators (auto-derived from domain), optional for students.
-- =============================================================================
create table users (
  id              uuid        primary key references auth.users(id) on delete cascade,
  email           text        not null unique,
  role            text        not null check (role in ('student', 'educator')),
  institution_id  uuid        references institutions(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger users_updated_at
  before update on users
  for each row execute function update_updated_at();

-- =============================================================================
-- DOCUMENTS
-- Student essays. Soft-deleted (deleted_at). Hard-deleted after 30-day grace.
-- is_esl: student-owned flag, set per document (not per account).
-- =============================================================================
create table documents (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references users(id) on delete cascade,
  title       text        not null default 'Untitled Document',
  content     text        not null default '',
  is_esl      boolean     not null default false,
  word_count  integer     not null default 0,
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index documents_user_id_idx on documents(user_id);
-- Partial index for listing active (non-deleted) documents efficiently
create index documents_user_active_idx on documents(user_id) where deleted_at is null;

create trigger documents_updated_at
  before update on documents
  for each row execute function update_updated_at();

-- =============================================================================
-- DOCUMENT VERSIONS
-- Immutable snapshots. Created automatically on each auto-save.
-- =============================================================================
create table document_versions (
  id           uuid        primary key default gen_random_uuid(),
  document_id  uuid        not null references documents(id) on delete cascade,
  content      text        not null,
  word_count   integer     not null default 0,
  created_at   timestamptz not null default now()
);

create index document_versions_document_id_idx on document_versions(document_id);

-- =============================================================================
-- PROCESS LOGS
-- One log per document. Events are a JSONB array batched from the client.
-- Each event shape: { type: string, timestamp: number, data?: object }
-- Postgres TOAST handles compression automatically.
-- =============================================================================
create table process_logs (
  id           uuid        primary key default gen_random_uuid(),
  document_id  uuid        not null unique references documents(id) on delete cascade,
  events       jsonb       not null default '[]',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger process_logs_updated_at
  before update on process_logs
  for each row execute function update_updated_at();

-- =============================================================================
-- STUDENT ANALYSES
-- Stored reports from the student /analyze endpoint (full document mode only).
-- Quick Analyze mode returns ephemerally — no row created.
-- =============================================================================
create table student_analyses (
  id           uuid        primary key default gen_random_uuid(),
  document_id  uuid        not null references documents(id) on delete cascade,
  user_id      uuid        not null references users(id) on delete cascade,
  report       jsonb       not null,
  created_at   timestamptz not null default now()
);

create index student_analyses_document_id_idx on student_analyses(document_id);
create index student_analyses_user_id_idx on student_analyses(user_id);

-- =============================================================================
-- EDUCATOR REVIEWS
-- Educator submissions: assignment prompt + student essay + optional sample + policy.
-- attention_level replaces the old "reviewLevel: High/Medium/Low" field —
-- renamed to avoid any implication of AI probability verdict.
-- =============================================================================
create table educator_reviews (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references users(id) on delete cascade,
  assignment_prompt text        not null,
  submission_text   text        not null,
  previous_sample   text,
  ai_policy         text        not null,
  rubric            text,
  report            jsonb       not null default '{}',
  attention_level   text        not null default 'routine'
                    check (attention_level in ('routine', 'some_signals', 'several_signals')),
  created_at        timestamptz not null default now()
);

create index educator_reviews_user_id_idx on educator_reviews(user_id);

-- =============================================================================
-- PROCESS LOG SHARES
-- The consent bridge between student process logs and educator reviews.
--
-- Flow:
--   1. Educator creates request (status=pending). Token generated automatically.
--      student_email set if educator knows it; otherwise purely link-based.
--   2. Student receives link (token), sees who's asking and for what review.
--   3. Student approves → process_log_id and snapshot_events populated,
--      status=approved. Student is shown consent disclosure before approving.
--   4. Student can revoke at any time → status=revoked, snapshot_events cleared.
--   5. expires_at enforced at read time (default 30 days, configurable per request).
-- =============================================================================
create table process_log_shares (
  id                  uuid        primary key default gen_random_uuid(),
  educator_review_id  uuid        not null references educator_reviews(id) on delete cascade,
  requester_id        uuid        not null references users(id) on delete cascade,
  student_email       text,
  student_id          uuid        references users(id) on delete set null,
  token               text        not null unique default rtrim(replace(replace(encode(gen_random_bytes(32), 'base64'), '+', '-'), '/', '_'), '='),
  status              text        not null default 'pending'
                      check (status in ('pending', 'approved', 'declined', 'expired', 'revoked')),
  process_log_id      uuid        references process_logs(id) on delete set null,
  snapshot_events     jsonb,
  expires_at          timestamptz not null default (now() + interval '30 days'),
  approved_at         timestamptz,
  declined_at         timestamptz,
  revoked_at          timestamptz,
  created_at          timestamptz not null default now()
);

create index process_log_shares_token_idx        on process_log_shares(token);
create index process_log_shares_requester_id_idx on process_log_shares(requester_id);
create index process_log_shares_student_id_idx   on process_log_shares(student_id);
create index process_log_shares_student_email_idx on process_log_shares(student_email);

-- =============================================================================
-- USAGE TRACKING
-- One row per analysis run. Free tier: 3 student analyses per calendar month.
-- Count rows WHERE user_id = ? AND analysis_type = 'student'
--   AND created_at >= date_trunc('month', now())
-- =============================================================================
create table usage_tracking (
  id             uuid        primary key default gen_random_uuid(),
  user_id        uuid        not null references users(id) on delete cascade,
  analysis_type  text        not null check (analysis_type in ('student', 'educator')),
  created_at     timestamptz not null default now()
);

create index usage_tracking_user_month_idx on usage_tracking(user_id, created_at);

-- =============================================================================
-- ROW LEVEL SECURITY
-- All sensitive tables are RLS-enabled.
-- Server-side operations (auth, admin tasks) use the service role key,
-- which bypasses RLS entirely.
-- =============================================================================

alter table institutions        enable row level security;
alter table users               enable row level security;
alter table documents           enable row level security;
alter table document_versions   enable row level security;
alter table process_logs        enable row level security;
alter table student_analyses    enable row level security;
alter table educator_reviews    enable row level security;
alter table process_log_shares  enable row level security;
alter table usage_tracking      enable row level security;

-- institutions: any authenticated user can read (needed to display institution name)
create policy "institutions_select" on institutions
  for select to authenticated using (true);

-- users: each user can read and update only their own row
create policy "users_select_own" on users
  for select to authenticated using (auth.uid() = id);

create policy "users_update_own" on users
  for update to authenticated using (auth.uid() = id);

-- documents: full CRUD on own documents
create policy "documents_all_own" on documents
  for all to authenticated using (auth.uid() = user_id);

-- document_versions: read/insert on versions belonging to own documents
create policy "document_versions_select_own" on document_versions
  for select to authenticated
  using (document_id in (select id from documents where user_id = auth.uid()));

create policy "document_versions_insert_own" on document_versions
  for insert to authenticated
  with check (document_id in (select id from documents where user_id = auth.uid()));

-- process_logs: full access on own logs
create policy "process_logs_all_own" on process_logs
  for all to authenticated
  using (document_id in (select id from documents where user_id = auth.uid()));

-- student_analyses: read own analyses
create policy "student_analyses_select_own" on student_analyses
  for select to authenticated using (auth.uid() = user_id);

-- educator_reviews: full CRUD on own reviews
create policy "educator_reviews_all_own" on educator_reviews
  for all to authenticated using (auth.uid() = user_id);

-- process_log_shares: educators read their own requests; students read/update theirs
create policy "shares_select_requester" on process_log_shares
  for select to authenticated using (auth.uid() = requester_id);

create policy "shares_select_student" on process_log_shares
  for select to authenticated using (auth.uid() = student_id);

create policy "shares_update_student" on process_log_shares
  for update to authenticated using (auth.uid() = student_id);

-- usage_tracking: users can read their own counts
create policy "usage_tracking_select_own" on usage_tracking
  for select to authenticated using (auth.uid() = user_id);
