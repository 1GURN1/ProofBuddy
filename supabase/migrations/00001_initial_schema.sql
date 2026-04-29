-- blocked_email_domains
-- Consumer email providers that cannot hold educator accounts.
-- Checked at educator signup: if the domain matches any row, reject with
-- "Educators must use an institutional email address."
-- Add rows here as new consumer providers emerge (no redeploy needed).

create table if not exists blocked_email_domains (
  id         uuid        primary key default gen_random_uuid(),
  domain     text        not null unique,
  created_at timestamptz not null default now()
);

insert into blocked_email_domains (domain) values
  ('gmail.com'),
  ('yahoo.com'),
  ('yahoo.co.uk'),
  ('hotmail.com'),
  ('outlook.com'),
  ('live.com'),
  ('icloud.com'),
  ('me.com'),
  ('mac.com'),
  ('aol.com'),
  ('protonmail.com'),
  ('proton.me'),
  ('gmx.com'),
  ('mail.com'),
  ('zoho.com'),
  ('yandex.com'),
  ('fastmail.com'),
  ('duck.com'),
  ('hey.com')
on conflict (domain) do nothing;
