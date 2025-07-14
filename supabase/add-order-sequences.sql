-- Create order sequences table
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
grant usage on schema public to anon, authenticated;
grant select on order_sequences to authenticated;
grant update on order_sequences to authenticated;
grant execute on function get_next_order_number() to anon, authenticated;
