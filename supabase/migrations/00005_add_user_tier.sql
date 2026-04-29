-- =============================================================================
-- 00005_add_user_tier.sql
-- Adds tier to users for free-tier enforcement.
-- Educators are always free individually — tier only gates student analyses.
--
-- free    : 3 student analyses per calendar month
-- student : unlimited (paid tier, $10/mo or $60/yr)
-- =============================================================================

alter table users
  add column tier text not null default 'free'
  check (tier in ('free', 'student'));
