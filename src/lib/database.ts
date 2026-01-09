import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface Donor {
  id: string
  name: string
  blood_type?: string
  amount: string
  donation_type: 'blood' | 'financial'
  location?: string
  method?: string
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  name: string
  message: string
  approved: boolean
  created_at: string
  updated_at: string
}

export interface Update {
  id: string
  title: string
  content: string
  author: string
  created_at: string
  updated_at: string
}

export interface DonationSubmission {
  id: string
  donor_name?: string
  donor_email?: string
  amount: number
  donation_method: string
  transaction_reference?: string
  proof_type: 'text' | 'image'
  proof_content?: string
  proof_file_url?: string
  status: 'pending' | 'verified' | 'rejected'
  verified_by?: string
  verification_notes?: string
  created_at: string
  updated_at: string
}

export interface AccountingEntry {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  reference_id?: string
  receipt_url?: string
  processed_by?: string
  transaction_date: string
  created_at: string
  updated_at: string
}

export interface AccountingCategory {
  id: string
  name: string
  type: 'income' | 'expense'
  description?: string
  is_active: boolean
  created_at: string
}

export interface CampaignSettings {
  id: string
  key: string
  value: string
  description?: string
  updated_at: string
}

// Database service functions

// DONORS
export async function getAllDonors(): Promise<Donor[]> {
  const { data, error } = await supabase
    .from('donors')
    .select('*')
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createDonor(donor: Omit<Donor, 'id' | 'created_at' | 'updated_at'>): Promise<Donor> {
  const { data, error } = await supabase
    .from('donors')
    .insert(donor)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteDonor(id: string): Promise<void> {
  const { error } = await supabase
    .from('donors')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// COMMENTS
export async function getAllApprovedComments(): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getAllComments(): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'approved'>): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .insert({ ...comment, approved: false })
  
  if (error) throw error
}

export async function approveComment(id: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .update({ approved: true })
    .eq('id', id)
  
  if (error) throw error
}

export async function deleteComment(id: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// UPDATES
export async function getAllUpdates(): Promise<Update[]> {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createUpdate(update: Omit<Update, 'id' | 'created_at' | 'updated_at'>): Promise<Update> {
  const { data, error } = await supabase
    .from('updates')
    .insert(update)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteUpdate(id: string): Promise<void> {
  const { error } = await supabase
    .from('updates')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// DONATION SUBMISSIONS
export async function getAllDonationSubmissions(): Promise<DonationSubmission[]> {
  const { data, error } = await supabase
    .from('donation_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createDonationSubmission(
  submission: Omit<DonationSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>
): Promise<DonationSubmission> {
  const { data, error } = await supabase
    .from('donation_submissions')
    .insert({ ...submission, status: 'pending' })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateDonationSubmissionStatus(
  id: string, 
  status: 'verified' | 'rejected', 
  verifiedBy?: string,
  notes?: string
): Promise<void> {
  const { error } = await supabase
    .from('donation_submissions')
    .update({ 
      status, 
      verified_by: verifiedBy,
      verification_notes: notes
    })
    .eq('id', id)
  
  if (error) throw error
}

// ACCOUNTING
export async function getAllAccountingEntries(): Promise<AccountingEntry[]> {
  const { data, error } = await supabase
    .from('accounting_entries')
    .select('*')
    .order('transaction_date', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createAccountingEntry(
  entry: Omit<AccountingEntry, 'id' | 'created_at' | 'updated_at'>
): Promise<AccountingEntry> {
  const { data, error } = await supabase
    .from('accounting_entries')
    .insert(entry)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function getAccountingSummary(): Promise<{
  totalIncome: number
  totalExpenses: number
  balance: number
  incomeByCategory: { [key: string]: number }
  expensesByCategory: { [key: string]: number }
}> {
  const { data, error } = await supabase
    .from('accounting_entries')
    .select('type, category, amount')
  
  if (error) throw error
  
  const entries = data || []
  const totalIncome = entries
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + Number(e.amount), 0)
  
  const totalExpenses = entries
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + Number(e.amount), 0)
  
  const incomeByCategory: { [key: string]: number } = {}
  const expensesByCategory: { [key: string]: number } = {}
  
  entries.forEach(entry => {
    const amount = Number(entry.amount)
    if (entry.type === 'income') {
      incomeByCategory[entry.category] = (incomeByCategory[entry.category] || 0) + amount
    } else {
      expensesByCategory[entry.category] = (expensesByCategory[entry.category] || 0) + amount
    }
  })
  
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    incomeByCategory,
    expensesByCategory
  }
}

// CAMPAIGN SETTINGS
export async function getCampaignSettings(): Promise<CampaignSettings[]> {
  const { data, error } = await supabase
    .from('campaign_settings')
    .select('*')
  
  if (error) throw error
  return data || []
}

export async function getCampaignSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('campaign_settings')
    .select('value')
    .eq('key', key)
    .single()
  
  if (error) return null
  return data?.value || null
}

export async function updateCampaignSetting(key: string, value: string): Promise<void> {
  const { error } = await supabase
    .from('campaign_settings')
    .upsert({ key, value })
  
  if (error) throw error
}

// ACCOUNTING CATEGORIES
export async function getAccountingCategories(): Promise<AccountingCategory[]> {
  const { data, error } = await supabase
    .from('accounting_categories')
    .select('*')
    .eq('is_active', true)
    .order('type', { ascending: true })
  
  if (error) throw error
  return data || []
}

// Export supabase client for file uploads and other operations
export { supabase }