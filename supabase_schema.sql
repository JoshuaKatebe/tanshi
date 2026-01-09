-- Supabase Database Schema for Tanshi Donation Platform
-- Run this SQL in your Supabase SQL Editor

-- Enable RLS (Row Level Security)
-- We'll configure policies after creating tables

-- 1. DONORS TABLE (replaces donors.json)
CREATE TABLE donors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    blood_type VARCHAR(10),
    amount VARCHAR(50) NOT NULL,
    donation_type VARCHAR(20) NOT NULL CHECK (donation_type IN ('blood', 'financial')),
    location VARCHAR(100),
    method VARCHAR(50), -- mobile money method, blood bank location, etc.
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COMMENTS TABLE (replaces comments.json)  
CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    message TEXT NOT NULL CHECK (LENGTH(message) <= 500),
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. UPDATES TABLE (replaces updates.json)
CREATE TABLE updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DONATION SUBMISSIONS TABLE (new - for proof submissions)
CREATE TABLE donation_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_name VARCHAR(100), -- optional
    donor_email VARCHAR(255), -- optional
    amount DECIMAL(10,2) NOT NULL,
    donation_method VARCHAR(50) NOT NULL, -- airtel, mtn, zamtel, etc.
    transaction_reference VARCHAR(100),
    proof_type VARCHAR(20) NOT NULL CHECK (proof_type IN ('text', 'image')),
    proof_content TEXT, -- text message or image URL
    proof_file_url TEXT, -- screenshot/document URL
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    verified_by UUID, -- admin who verified
    verification_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ACCOUNTING ENTRIES TABLE (new - for expense tracking)
CREATE TABLE accounting_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    category VARCHAR(50) NOT NULL, -- 'donation', 'medical_expense', 'operational', etc.
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    reference_id UUID, -- can link to donation_submissions.id for income
    receipt_url TEXT, -- receipt/proof of expense
    processed_by VARCHAR(100), -- who recorded this entry
    transaction_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACCOUNTING CATEGORIES TABLE (for better organization)
CREATE TABLE accounting_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CAMPAIGN SETTINGS TABLE (for progress tracking)
CREATE TABLE campaign_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(50) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default campaign settings
INSERT INTO campaign_settings (key, value, description) VALUES
    ('target_amount', '10000.00', 'Total fundraising target amount'),
    ('campaign_title', 'Help Panashe Muza', 'Campaign title'),
    ('campaign_description', 'Emergency medical fund for Panashe Muza', 'Campaign description'),
    ('is_active', 'true', 'Whether the campaign is currently active');

-- Insert default accounting categories
INSERT INTO accounting_categories (name, type, description) VALUES
    ('donation', 'income', 'Direct donations from supporters'),
    ('fundraising', 'income', 'Fundraising event proceeds'),
    ('medical_expenses', 'expense', 'Hospital bills, medications, treatments'),
    ('operational_costs', 'expense', 'Platform costs, transaction fees'),
    ('administrative', 'expense', 'Administrative and coordination costs'),
    ('supplies', 'expense', 'Medical supplies and equipment');

-- Create indexes for better performance
CREATE INDEX idx_donors_donation_type ON donors(donation_type);
CREATE INDEX idx_donors_created_at ON donors(created_at DESC);
CREATE INDEX idx_comments_approved ON comments(approved);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_updates_created_at ON updates(created_at DESC);
CREATE INDEX idx_donation_submissions_status ON donation_submissions(status);
CREATE INDEX idx_donation_submissions_created_at ON donation_submissions(created_at DESC);
CREATE INDEX idx_accounting_entries_type ON accounting_entries(type);
CREATE INDEX idx_accounting_entries_category ON accounting_entries(category);
CREATE INDEX idx_accounting_entries_transaction_date ON accounting_entries(transaction_date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_donors_updated_at BEFORE UPDATE ON donors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_updates_updated_at BEFORE UPDATE ON updates FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_donation_submissions_updated_at BEFORE UPDATE ON donation_submissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_accounting_entries_updated_at BEFORE UPDATE ON accounting_entries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow public read, authenticated users can insert)
-- Donors - public can read completed donations, anyone can insert
CREATE POLICY "Public can view completed donors" ON donors FOR SELECT USING (status = 'completed');
CREATE POLICY "Anyone can insert donors" ON donors FOR INSERT WITH CHECK (true);

-- Comments - public can read approved comments, anyone can insert
CREATE POLICY "Public can view approved comments" ON comments FOR SELECT USING (approved = true);
CREATE POLICY "Anyone can insert comments" ON comments FOR INSERT WITH CHECK (true);

-- Updates - public can read all
CREATE POLICY "Public can view updates" ON updates FOR SELECT USING (true);

-- Donation submissions - public can insert, only authenticated can view all
CREATE POLICY "Anyone can insert donation submissions" ON donation_submissions FOR INSERT WITH CHECK (true);

-- Campaign settings - public can read
CREATE POLICY "Public can view campaign settings" ON campaign_settings FOR SELECT USING (true);

-- Accounting categories - public can read active categories
CREATE POLICY "Public can view active accounting categories" ON accounting_categories FOR SELECT USING (is_active = true);

-- Note: For admin operations (approving comments, managing accounting, etc.)
-- you'll need to add authentication-based policies or use service role key