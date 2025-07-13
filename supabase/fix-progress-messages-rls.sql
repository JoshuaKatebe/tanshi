-- Fix RLS policies for progress_messages table

-- Drop existing policies
drop policy if exists "Enable read access for all users" on progress_messages;
drop policy if exists "Enable insert for authenticated users only" on progress_messages;
drop policy if exists "Enable update for authenticated users only" on progress_messages;

-- Create new policies that allow anonymous users (since our API handles auth separately)
create policy "Enable read access for all users" on progress_messages
for select
to anon, authenticated
using (true);

create policy "Enable insert for all users" on progress_messages
for insert
to anon, authenticated
with check (true);

create policy "Enable update for all users" on progress_messages
for update
to anon, authenticated
using (true);

-- Grant permissions to anon role
grant usage on schema public to anon;
grant all on progress_messages to anon;
grant all on all sequences in schema public to anon;
