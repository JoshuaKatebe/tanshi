# Database Fixes for Progress Messages

## Issue
The admin dashboard cannot update progress because of Row Level Security (RLS) policies on the `progress_messages` table.

## Solutions

### Option 1: Apply RLS Fix via Supabase Dashboard
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the contents of `supabase/fix-progress-messages-rls.sql`

### Option 2: Alternative - Disable RLS temporarily
If you want to quickly test, you can disable RLS on the progress_messages table:

```sql
-- Temporarily disable RLS (NOT recommended for production)
alter table progress_messages disable row level security;
```

### Option 3: Create the table if it doesn't exist
If the `progress_messages` table doesn't exist, run:

```sql
-- Run the complete setup
-- First: supabase/add-progress-messages.sql
-- Then: supabase/fix-progress-messages-rls.sql
```

## Testing
After applying the fix, the dashboard should be able to:
1. View all projects
2. Update project status
3. Add progress messages
4. Calculate revenue correctly

## Files to Apply
1. `supabase/add-progress-messages.sql` - Creates the table
2. `supabase/fix-progress-messages-rls.sql` - Fixes RLS policies
