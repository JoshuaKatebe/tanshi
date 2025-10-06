-- PawaPay Callbacks Table Schema
-- This table stores all callback data from PawaPay webhooks

CREATE TABLE IF NOT EXISTS pawapay_callbacks (
  id BIGSERIAL PRIMARY KEY,
  
  -- Common fields for all callback types
  payment_id VARCHAR(255) NOT NULL,
  callback_type VARCHAR(50) NOT NULL CHECK (callback_type IN ('DEPOSIT', 'PAYOUT', 'REFUND')),
  status VARCHAR(100) NOT NULL,
  
  -- Transaction specific IDs
  deposit_id VARCHAR(255),
  payout_id VARCHAR(255), 
  refund_id VARCHAR(255),
  original_payment_id VARCHAR(255), -- For refunds
  
  -- Amount and currency
  amount VARCHAR(50) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  
  -- Location and correspondent
  country VARCHAR(10) NOT NULL,
  correspondent VARCHAR(100) NOT NULL,
  
  -- Customer information
  customer_name VARCHAR(255),
  phone_number VARCHAR(50),
  
  -- Status and reason codes
  reason_code VARCHAR(100),
  reason TEXT,
  rejection_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE,
  last_update_time TIMESTAMP WITH TIME ZONE,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Full callback payload for reference
  callback_data JSONB,
  
  -- Metadata
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(payment_id, callback_type),
  
  -- Indexes for common queries
  INDEX idx_pawapay_callbacks_payment_id (payment_id),
  INDEX idx_pawapay_callbacks_type_status (callback_type, status),
  INDEX idx_pawapay_callbacks_deposit_id (deposit_id),
  INDEX idx_pawapay_callbacks_payout_id (payout_id),
  INDEX idx_pawapay_callbacks_refund_id (refund_id),
  INDEX idx_pawapay_callbacks_processed_at (processed_at),
  INDEX idx_pawapay_callbacks_phone (phone_number)
);

-- Add Row Level Security
ALTER TABLE pawapay_callbacks ENABLE ROW LEVEL SECURITY;

-- Policy for admin access (adjust based on your auth setup)
CREATE POLICY "Admin can manage all callbacks" ON pawapay_callbacks
  FOR ALL USING (auth.role() = 'admin');

-- Policy for authenticated users to view their own callbacks (if needed)
CREATE POLICY "Users can view callbacks related to their phone number" ON pawapay_callbacks
  FOR SELECT USING (phone_number = auth.jwt()->>'phone');

-- Add comments for documentation
COMMENT ON TABLE pawapay_callbacks IS 'Stores all callback data received from PawaPay webhooks for deposits, payouts, and refunds';
COMMENT ON COLUMN pawapay_callbacks.payment_id IS 'Unique payment identifier from PawaPay';
COMMENT ON COLUMN pawapay_callbacks.callback_type IS 'Type of callback: DEPOSIT, PAYOUT, or REFUND';
COMMENT ON COLUMN pawapay_callbacks.callback_data IS 'Full JSON payload received from PawaPay for debugging and reference';

-- Update existing quotes table to support payment tracking (if not already present)
DO $$
BEGIN
  -- Add payment-related columns to quotes table if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'payment_id') THEN
    ALTER TABLE quotes ADD COLUMN payment_id VARCHAR(255);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'payment_status') THEN
    ALTER TABLE quotes ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'deposit_id') THEN
    ALTER TABLE quotes ADD COLUMN deposit_id VARCHAR(255);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'refund_id') THEN
    ALTER TABLE quotes ADD COLUMN refund_id VARCHAR(255);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'paid_amount') THEN
    ALTER TABLE quotes ADD COLUMN paid_amount VARCHAR(50);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'paid_currency') THEN
    ALTER TABLE quotes ADD COLUMN paid_currency VARCHAR(10);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'paid_at') THEN
    ALTER TABLE quotes ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'failed_at') THEN
    ALTER TABLE quotes ADD COLUMN failed_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'payment_failure_reason') THEN
    ALTER TABLE quotes ADD COLUMN payment_failure_reason TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotes' AND column_name = 'refund_failure_reason') THEN
    ALTER TABLE quotes ADD COLUMN refund_failure_reason TEXT;
  END IF;
END $$;

-- Create payouts table for payout tracking (if you need it)
CREATE TABLE IF NOT EXISTS payouts (
  id BIGSERIAL PRIMARY KEY,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  payout_id VARCHAR(255),
  recipient_phone VARCHAR(50) NOT NULL,
  recipient_name VARCHAR(255),
  amount VARCHAR(50) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  country VARCHAR(10) NOT NULL,
  correspondent VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  failure_reason TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_payouts_payment_id (payment_id),
  INDEX idx_payouts_payout_id (payout_id),
  INDEX idx_payouts_status (status),
  INDEX idx_payouts_recipient_phone (recipient_phone)
);

-- Add RLS to payouts table
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage all payouts" ON payouts
  FOR ALL USING (auth.role() = 'admin');

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at columns
CREATE TRIGGER update_pawapay_callbacks_updated_at BEFORE UPDATE ON pawapay_callbacks
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON payouts
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();