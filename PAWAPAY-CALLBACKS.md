# PawaPay Callback API Endpoints

This document describes the PawaPay webhook callback endpoints implemented in the Tanshi Digital Solutions application.

## Overview

The application provides three webhook endpoints to handle PawaPay payment notifications:

- **Deposit Callbacks**: `/api/callbacks/deposit` - Handles incoming payment notifications
- **Payout Callbacks**: `/api/callbacks/payout` - Handles outgoing payment notifications  
- **Refund Callbacks**: `/api/callbacks/refund` - Handles refund payment notifications

## Endpoints

### 1. Deposit Callback
**URL**: `https://tanshidigital.com/api/callbacks/deposit`  
**Method**: `POST`  
**Purpose**: Receives notifications when customers make payments to your business

#### Request Headers
```
Content-Type: application/json
X-PawaPay-Signature: sha256=<signature_hash>
```

#### Request Body Example
```json
{
  "paymentId": "payment_123456789",
  "depositId": "deposit_987654321",
  "type": "DEPOSIT",
  "status": "COMPLETED",
  "amount": "10000",
  "currency": "ZMW",
  "country": "ZM",
  "correspondent": "MTN_MOMO_ZMB",
  "customer": {
    "customerName": "John Doe",
    "phoneNumber": "+260977123456"
  },
  "created": "2024-01-15T10:30:00Z",
  "lastUpdateTime": "2024-01-15T10:35:00Z",
  "reasonCode": "SUCCESS",
  "reason": "Payment completed successfully"
}
```

#### Response
```json
{
  "success": true,
  "message": "Deposit callback processed successfully",
  "depositId": "deposit_987654321"
}
```

### 2. Payout Callback  
**URL**: `https://tanshidigital.com/api/callbacks/payout`  
**Method**: `POST`  
**Purpose**: Receives notifications when you send payments to customers

#### Request Body Example
```json
{
  "paymentId": "payment_123456789",
  "payoutId": "payout_987654321", 
  "type": "PAYOUT",
  "status": "COMPLETED",
  "amount": "5000",
  "currency": "ZMW",
  "country": "ZM",
  "correspondent": "AIRTEL_OAPI_ZMB",
  "customer": {
    "customerName": "Jane Smith",
    "phoneNumber": "+260966987654"
  },
  "created": "2024-01-15T14:20:00Z",
  "lastUpdateTime": "2024-01-15T14:25:00Z"
}
```

### 3. Refund Callback
**URL**: `https://tanshidigital.com/api/callbacks/refund`  
**Method**: `POST`  
**Purpose**: Receives notifications when refunds are processed

#### Request Body Example
```json
{
  "paymentId": "refund_123456789",
  "refundId": "refund_987654321",
  "originalPaymentId": "payment_original_123",
  "type": "REFUND", 
  "status": "COMPLETED",
  "amount": "10000",
  "currency": "ZMW",
  "country": "ZM",
  "correspondent": "MTN_MOMO_ZMB",
  "customer": {
    "customerName": "John Doe",
    "phoneNumber": "+260977123456"
  },
  "created": "2024-01-15T16:10:00Z",
  "lastUpdateTime": "2024-01-15T16:15:00Z"
}
```

## Status Values

PawaPay callbacks can contain the following status values:

- `COMPLETED` - Transaction completed successfully
- `FAILED` - Transaction failed permanently  
- `ACCEPTED` - Transaction accepted and processing
- `REJECTED` - Transaction rejected
- `SUBMITTED` - Transaction submitted to correspondent
- `PENDING` - Transaction pending processing
- `UNKNOWN` - Status unknown

## Security

### Webhook Signature Verification

All callbacks include a signature header that should be verified:

```
X-PawaPay-Signature: sha256=<hmac_sha256_hash>
```

To verify signatures, set the `PAWAPAY_WEBHOOK_SECRET` environment variable with your webhook secret from PawaPay.

The signature verification process:
1. Extract the signature from the `X-PawaPay-Signature` header
2. Create HMAC SHA256 hash of the raw request body using your webhook secret
3. Compare the computed hash with the provided signature

### Environment Variables

Add these environment variables to your `.env.local` file:

```env
PAWAPAY_WEBHOOK_SECRET=your_webhook_secret_from_pawapay
```

## Database Schema

The callbacks are stored in the `pawapay_callbacks` table with the following structure:

```sql
CREATE TABLE pawapay_callbacks (
  id BIGSERIAL PRIMARY KEY,
  payment_id VARCHAR(255) NOT NULL,
  callback_type VARCHAR(50) NOT NULL, -- 'DEPOSIT', 'PAYOUT', 'REFUND'
  status VARCHAR(100) NOT NULL,
  deposit_id VARCHAR(255),
  payout_id VARCHAR(255),
  refund_id VARCHAR(255),
  original_payment_id VARCHAR(255), -- For refunds
  amount VARCHAR(50) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  country VARCHAR(10) NOT NULL,
  correspondent VARCHAR(100) NOT NULL,
  customer_name VARCHAR(255),
  phone_number VARCHAR(50),
  reason_code VARCHAR(100),
  reason TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  last_update_time TIMESTAMP WITH TIME ZONE,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  callback_data JSONB, -- Full callback payload for reference
  -- ... other fields
);
```

## Order Status Updates

The callbacks automatically update related orders in the `quotes` table:

### Successful Deposit
- `status` → `'paid'`
- `payment_status` → `'completed'`
- `payment_id` → Payment ID from callback
- `deposit_id` → Deposit ID from callback
- `paid_amount` → Amount from callback
- `paid_currency` → Currency from callback
- `paid_at` → Current timestamp

### Failed Deposit  
- `payment_status` → `'failed'`
- `payment_failure_reason` → Reason from callback
- `failed_at` → Current timestamp

### Successful Refund
- `status` → `'refunded'`
- `payment_status` → `'refunded'`
- `refund_id` → Refund ID from callback

## Health Check Endpoints

Each callback endpoint also supports GET requests for health checking:

```bash
# Check deposit endpoint
curl https://tanshidigital.com/api/callbacks/deposit

# Check payout endpoint  
curl https://tanshidigital.com/api/callbacks/payout

# Check refund endpoint
curl https://tanshidigital.com/api/callbacks/refund
```

Response:
```json
{
  "status": "active",
  "endpoint": "PawaPay [Type] Callback",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Configuring PawaPay Webhooks

In your PawaPay dashboard, configure the webhook endpoints:

1. **Deposit Webhook URL**: `https://tanshidigital.com/api/callbacks/deposit`
2. **Payout Webhook URL**: `https://tanshidigital.com/api/callbacks/payout`  
3. **Refund Webhook URL**: `https://tanshidigital.com/api/callbacks/refund`

Make sure to:
- Set the HTTP method to `POST`
- Configure the webhook secret for signature verification
- Enable the callback events you want to receive

## Error Handling

The API endpoints are designed to always return HTTP 200 to PawaPay to prevent unnecessary retries. Errors are logged internally but don't cause the webhook to fail.

This ensures:
- PawaPay doesn't repeatedly retry failed webhooks
- Your system processes each callback exactly once
- Internal errors don't affect PawaPay's webhook delivery

## Testing

For testing webhook endpoints locally, you can use ngrok or similar tools:

```bash
# Install ngrok
npm install -g ngrok

# Expose local development server
ngrok http 3000

# Use the ngrok URL for webhook configuration
# https://abc123.ngrok.io/api/callbacks/deposit
```

## Logs and Monitoring

All callback processing is logged with detailed information including:
- Callback type and payment ID
- Status and amount information  
- Customer details
- Processing success/failure
- Database operation results

Check your application logs for debugging webhook issues.

## Support

For issues with PawaPay callback implementation:

1. Check the application logs for error details
2. Verify webhook secret configuration
3. Test endpoints using the health check GET requests
4. Ensure database schema has been applied
5. Contact PawaPay support for webhook delivery issues