import crypto from 'crypto';

// PawaPay webhook payload types
export interface PawaPayBaseCallback {
  paymentId: string;
  status: string;
  amount: string;
  currency: string;
  country: string;
  correspondent: string;
  customer: {
    customerName: string;
    phoneNumber: string;
  };
  created: string;
  lastUpdateTime: string;
  reasonCode?: string;
  reason?: string;
  rejectionReason?: string;
  correspondentIds?: {
    correspondentId: string;
  };
}

export interface PawaPayDepositCallback extends PawaPayBaseCallback {
  type: 'DEPOSIT';
  depositId: string;
}

export interface PawaPayPayoutCallback extends PawaPayBaseCallback {
  type: 'PAYOUT';
  payoutId: string;
}

export interface PawaPayRefundCallback extends PawaPayBaseCallback {
  type: 'REFUND';
  refundId: string;
  originalPaymentId: string;
}

export type PawaPayCallback = PawaPayDepositCallback | PawaPayPayoutCallback | PawaPayRefundCallback;

// PawaPay webhook signature verification
export function verifyPawaPaySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    console.warn('PawaPay signature verification skipped: missing signature or secret');
    return true; // Return true to allow processing during development
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex');

    // PawaPay typically prefixes with 'sha256='
    const cleanSignature = signature.replace('sha256=', '');
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(cleanSignature, 'hex')
    );
  } catch (error) {
    console.error('Error verifying PawaPay signature:', error);
    return false;
  }
}

// Status mapping utilities
export const PAWAPAY_STATUS = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  SUBMITTED: 'SUBMITTED',
  PENDING: 'PENDING',
  UNKNOWN: 'UNKNOWN',
} as const;

export type PawaPayStatus = keyof typeof PAWAPAY_STATUS;

// Helper function to determine if status indicates success
export function isSuccessfulStatus(status: string): boolean {
  return status === PAWAPAY_STATUS.COMPLETED || status === PAWAPAY_STATUS.ACCEPTED;
}

// Helper function to determine if status indicates failure
export function isFailedStatus(status: string): boolean {
  return status === PAWAPAY_STATUS.FAILED || status === PAWAPAY_STATUS.REJECTED;
}

// Helper function to format PawaPay amount (usually comes as string in smallest currency unit)
export function formatPawaPayAmount(amount: string, currency: string): number {
  const numAmount = parseFloat(amount);
  // Most currencies use 2 decimal places, but this can be adjusted based on specific requirements
  return numAmount / 100;
}

// Helper function to extract relevant data for logging/storage
export function extractCallbackData(callback: PawaPayCallback) {
  return {
    paymentId: callback.paymentId,
    type: callback.type,
    status: callback.status,
    amount: callback.amount,
    currency: callback.currency,
    country: callback.country,
    correspondent: callback.correspondent,
    customerName: callback.customer.customerName,
    phoneNumber: callback.customer.phoneNumber,
    created: callback.created,
    lastUpdateTime: callback.lastUpdateTime,
    reasonCode: callback.reasonCode,
    reason: callback.reason,
    rejectionReason: callback.rejectionReason,
    // Type-specific fields
    ...(callback.type === 'DEPOSIT' && { depositId: callback.depositId }),
    ...(callback.type === 'PAYOUT' && { payoutId: callback.payoutId }),
    ...(callback.type === 'REFUND' && { 
      refundId: callback.refundId, 
      originalPaymentId: callback.originalPaymentId 
    }),
  };
}