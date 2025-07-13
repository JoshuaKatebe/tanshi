import { createClient } from '@supabase/supabase-js'

// These should be in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our database tables
export interface Quote {
  id: string
  order_id: string
  package_name: string
  package_price: number
  extra_pages: number
  addons: any[]
  maintenance: number
  total_price: number
  status: 'submitted' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  user_id?: string
}

export interface QuoteDetails {
  id: string
  quote_id: string
  business_summary?: string
  project_goals?: string
  file_url?: string
}

export interface Contact {
  id: string
  quote_id: string
  name: string
  email: string
  phone?: string
  contact_method: 'email' | 'whatsapp' | 'phone'
}

export interface Referral {
  id: string
  quote_id: string
  referrer_name?: string
  code?: string
}
