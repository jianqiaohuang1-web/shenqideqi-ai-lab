create extension if not exists pgcrypto;

create table if not exists public.portfolio_visits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  page_path text not null,
  page_url text,
  referrer text,
  visitor_id text,
  session_id text,
  ip_address inet,
  user_agent text,
  language text,
  timezone text,
  screen_width integer,
  screen_height integer,
  viewport_width integer,
  viewport_height integer
);

create index if not exists portfolio_visits_created_at_idx
  on public.portfolio_visits (created_at desc);

create index if not exists portfolio_visits_page_path_idx
  on public.portfolio_visits (page_path);

create index if not exists portfolio_visits_ip_address_idx
  on public.portfolio_visits (ip_address);

create index if not exists portfolio_visits_visitor_id_idx
  on public.portfolio_visits (visitor_id);

alter table public.portfolio_visits enable row level security;

drop policy if exists "Allow public visit inserts" on public.portfolio_visits;

create policy "Allow public visit inserts"
  on public.portfolio_visits
  for insert
  to anon
  with check (true);

drop policy if exists "Block public visit reads" on public.portfolio_visits;

create policy "Block public visit reads"
  on public.portfolio_visits
  for select
  to anon
  using (false);

create or replace view public.portfolio_visit_daily_summary as
select
  date_trunc('day', created_at)::date as visit_date,
  count(*) as page_views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct ip_address) as unique_ips
from public.portfolio_visits
group by 1
order by 1 desc;

create or replace view public.portfolio_visit_page_summary as
select
  page_path,
  count(*) as page_views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct ip_address) as unique_ips,
  max(created_at) as last_visited_at
from public.portfolio_visits
group by 1
order by page_views desc;
