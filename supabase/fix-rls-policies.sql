-- Disable RLS temporarily to update policies
alter table quotes disable row level security;
alter table quote_details disable row level security;
alter table contacts disable row level security;
alter table referrals disable row level security;

-- Drop existing policies
drop policy if exists "Public read access for tracking" on quotes;
drop policy if exists "Public insert for new quotes" on quotes;
drop policy if exists "Public insert for quote details" on quote_details;
drop policy if exists "Public insert for contacts" on contacts;
drop policy if exists "Public insert for referrals" on referrals;

-- Re-enable RLS
alter table quotes enable row level security;
alter table quote_details enable row level security;
alter table contacts enable row level security;
alter table referrals enable row level security;

-- Create new policies with proper permissions

-- QUOTES TABLE POLICIES
-- Allow anyone to insert new quotes
create policy "Enable insert for all users" on quotes
for insert
to anon, authenticated
with check (true);

-- Allow anyone to read quotes (for tracking)
create policy "Enable read access for all users" on quotes
for select
to anon, authenticated
using (true);

-- QUOTE_DETAILS TABLE POLICIES
-- Allow anyone to insert quote details
create policy "Enable insert for all users" on quote_details
for insert
to anon, authenticated
with check (true);

-- Allow reading quote details through joins
create policy "Enable read access for all users" on quote_details
for select
to anon, authenticated
using (true);

-- CONTACTS TABLE POLICIES
-- Allow anyone to insert contacts
create policy "Enable insert for all users" on contacts
for insert
to anon, authenticated
with check (true);

-- Allow reading contacts through joins
create policy "Enable read access for all users" on contacts
for select
to anon, authenticated
using (true);

-- REFERRALS TABLE POLICIES
-- Allow anyone to insert referrals
create policy "Enable insert for all users" on referrals
for insert
to anon, authenticated
with check (true);

-- Allow reading referrals through joins
create policy "Enable read access for all users" on referrals
for select
to anon, authenticated
using (true);

-- Grant necessary permissions to anon role
grant usage on schema public to anon;
grant all on all tables in schema public to anon;
grant all on all sequences in schema public to anon;
grant all on all functions in schema public to anon;
