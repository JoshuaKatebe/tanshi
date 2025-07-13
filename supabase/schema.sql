-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- 1. QUOTES TABLE
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,
  package_name text not null,
  package_price integer not null,
  extra_pages integer default 0,
  addons jsonb default '[]',
  maintenance integer default 0,
  total_price integer not null,
  status text default 'submitted' check (status in ('submitted', 'in_progress', 'completed', 'cancelled')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. QUOTE DETAILS
create table if not exists quote_details (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete cascade,
  business_summary text,
  project_goals text,
  file_url text
);

-- 3. CONTACT INFO
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  contact_method text check (contact_method in ('email', 'whatsapp', 'phone')) default 'email'
);

-- 4. REFERRALS
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete cascade,
  referrer_name text,
  code text
);

-- Optional: 5. USERS (for future login system)
create table if not exists users (
  id uuid primary key, -- Supabase Auth UID
  email text unique not null,
  name text,
  role text default 'client' check (role in ('client', 'admin', 'sales_rep'))
);

-- Link quotes to users (future optional)
alter table quotes add column if not exists user_id uuid references users(id);

-- 6. VIEW: QUOTE SUMMARY
create or replace view quote_summary_view as
select
  q.order_id,
  c.name as client_name,
  c.email as client_email,
  q.package_name,
  q.total_price,
  q.status,
  q.created_at
from quotes q
join contacts c on q.id = c.quote_id;

-- Enable RLS (Row Level Security)
alter table quotes enable row level security;
alter table quote_details enable row level security;
alter table contacts enable row level security;
alter table referrals enable row level security;

-- Allow public read access by order ID for tracking
create policy "Public read access for tracking" on quotes
for select
using (true);

-- Allow public insert for new quotes
create policy "Public insert for new quotes" on quotes
for insert
with check (true);

-- Allow public insert for quote details
create policy "Public insert for quote details" on quote_details
for insert
with check (true);

-- Allow public insert for contacts
create policy "Public insert for contacts" on contacts
for insert
with check (true);

-- Allow public insert for referrals
create policy "Public insert for referrals" on referrals
for insert
with check (true);

-- Create indexes for better performance
create index if not exists idx_quotes_order_id on quotes(order_id);
create index if not exists idx_quotes_status on quotes(status);
create index if not exists idx_quotes_created_at on quotes(created_at);

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to update updated_at on quotes table
create trigger update_quotes_updated_at before update on quotes
for each row execute function update_updated_at_column();
