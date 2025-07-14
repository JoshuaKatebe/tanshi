-- Run all migrations in order
-- Execute this file in Supabase SQL editor to set up all necessary tables

-- 1. First run the main schema
-- Already exists from schema.sql

-- 2. Add progress messages table
-- From add-progress-messages.sql
create table if not exists progress_messages (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete cascade,
  message text not null,
  status text check (status in ('info', 'success', 'warning', 'payment')) default 'info',
  created_at timestamp with time zone default now(),
  created_by text default 'system'
);

-- Create index for better performance
create index if not exists idx_progress_messages_quote_id on progress_messages(quote_id);
create index if not exists idx_progress_messages_created_at on progress_messages(created_at);

-- Enable RLS
alter table progress_messages enable row level security;

-- Allow anyone to read progress messages
create policy "Enable read access for all users" on progress_messages
for select
to anon, authenticated
using (true);

-- Only authenticated users (admins) can insert/update progress messages
create policy "Enable insert for authenticated users only" on progress_messages
for insert
to authenticated
with check (true);

create policy "Enable update for authenticated users only" on progress_messages
for update
to authenticated
using (true);

-- Grant permissions
grant usage on schema public to anon;
grant select on progress_messages to anon;
grant all on progress_messages to authenticated;

-- Function to automatically add initial progress message when quote is created
create or replace function add_initial_progress_message()
returns trigger as $$
begin
  insert into progress_messages (quote_id, message, status)
  values (new.id, 'Awaiting first payment', 'payment');
  return new;
end;
$$ language plpgsql;

-- Trigger to add initial message on quote creation
drop trigger if exists add_initial_progress_after_quote_insert on quotes;
create trigger add_initial_progress_after_quote_insert
after insert on quotes
for each row execute function add_initial_progress_message();

-- 3. Add order sequences table
-- From add-order-sequences.sql
create table if not exists order_sequences (
  id uuid primary key default gen_random_uuid(),
  sequence_type text unique not null default 'quote',
  last_number integer not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Insert initial sequence for quotes
insert into order_sequences (sequence_type, last_number) 
values ('quote', 0)
on conflict (sequence_type) do nothing;

-- Function to get next order number
create or replace function get_next_order_number()
returns integer as $$
declare
  next_number integer;
begin
  -- Lock the row and increment the counter
  update order_sequences
  set last_number = last_number + 1,
      updated_at = now()
  where sequence_type = 'quote'
  returning last_number into next_number;
  
  return next_number;
end;
$$ language plpgsql;

-- Enable RLS
alter table order_sequences enable row level security;

-- Only authenticated users can read/update sequences
create policy "Enable read for authenticated users" on order_sequences
for select
to authenticated
using (true);

create policy "Enable update for authenticated users" on order_sequences
for update
to authenticated
using (true);

-- Grant permissions
grant select on order_sequences to authenticated;
grant update on order_sequences to authenticated;
grant execute on function get_next_order_number() to anon, authenticated;

-- 4. Update any existing quotes that have 'pending' status to 'submitted'
-- This fixes the constraint violation issue
update quotes 
set status = 'submitted' 
where status = 'pending';

-- 5. Add progress templates table (optional - for admin reference)
create table if not exists progress_templates (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  message text not null,
  status text check (status in ('info', 'success', 'warning', 'payment')) default 'info',
  order_index integer default 0
);

-- Insert common progress templates if they don't exist
insert into progress_templates (category, message, status, order_index) 
select * from (values
  ('payment', 'Awaiting first payment', 'payment', 1),
  ('payment', 'First payment received', 'success', 2),
  ('development', 'Beginning development', 'info', 3),
  ('development', 'Homepage complete', 'success', 4),
  ('development', 'Services page complete', 'success', 5),
  ('development', 'About page complete', 'success', 6),
  ('development', 'Contact page complete', 'success', 7),
  ('development', 'Base website complete', 'success', 8),
  ('testing', 'Debugging and fixes in progress', 'warning', 9),
  ('testing', 'Quality assurance and testing begins', 'info', 10),
  ('testing', 'Fixing identified issues', 'warning', 11),
  ('testing', '2nd QA testing', 'info', 12),
  ('testing', 'QA complete and passed', 'success', 13),
  ('payment', 'Awaiting final payment', 'payment', 14),
  ('payment', 'Final payment received', 'success', 15),
  ('deployment', 'Preparing for production launch', 'info', 16),
  ('deployment', 'Production launched at your domain', 'success', 17),
  ('completion', 'Project completed successfully', 'success', 18)
) as t(category, message, status, order_index)
where not exists (
  select 1 from progress_templates pt 
  where pt.message = t.message
);

-- Print completion message
select 'All migrations completed successfully!' as status;
