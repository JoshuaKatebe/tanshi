import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  PawaPayRefundCallback, 
  verifyPawaPaySignature, 
  extractCallbackData,
  isSuccessfulStatus,
  isFailedStatus 
} from '@/lib/pawapay';

export async function POST(request: Request) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('X-PawaPay-Signature') || request.headers.get('x-pawapay-signature');
    const webhookSecret = process.env.PAWAPAY_WEBHOOK_SECRET || '';

    // Verify signature if secret is provided
    if (webhookSecret && !verifyPawaPaySignature(rawBody, signature || '', webhookSecret)) {
      console.error('PawaPay refund callback: Invalid signature');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the JSON payload
    let payload: PawaPayRefundCallback;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      console.error('PawaPay refund callback: Invalid JSON payload', error);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate payload structure
    if (!payload.paymentId || !payload.refundId || !payload.status) {
      console.error('PawaPay refund callback: Missing required fields', payload);
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract callback data for storage
    const callbackData = extractCallbackData(payload);

    // Log the callback for debugging
    console.log('PawaPay refund callback received:', {
      refundId: payload.refundId,
      paymentId: payload.paymentId,
      originalPaymentId: payload.originalPaymentId,
      status: payload.status,
      amount: payload.amount,
      currency: payload.currency
    });

    // Store the callback in database (you may want to create a pawapay_callbacks table)
    const { error: callbackError } = await supabase
      .from('pawapay_callbacks')
      .upsert([{
        payment_id: payload.paymentId,
        refund_id: payload.refundId,
        original_payment_id: payload.originalPaymentId,
        callback_type: 'REFUND',
        status: payload.status,
        amount: payload.amount,
        currency: payload.currency,
        country: payload.country,
        correspondent: payload.correspondent,
        customer_name: payload.customer.customerName,
        phone_number: payload.customer.phoneNumber,
        reason_code: payload.reasonCode,
        reason: payload.reason,
        rejection_reason: payload.rejectionReason,
        created_at: payload.created,
        last_update_time: payload.lastUpdateTime,
        callback_data: callbackData,
        processed_at: new Date().toISOString()
      }], { 
        onConflict: 'payment_id,callback_type',
        ignoreDuplicates: false 
      });

    if (callbackError) {
      console.error('Error storing PawaPay refund callback:', callbackError);
      // Don't return error to PawaPay - we still processed the callback
    }

    // Update related order/transaction status based on refund status
    if (isSuccessfulStatus(payload.status)) {
      // Refund was successful - update the related order status
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ 
          status: 'refunded',
          payment_status: 'refunded',
          refund_id: payload.refundId,
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.originalPaymentId);

      if (updateError) {
        console.error('Error updating order status for successful refund:', updateError);
      }

      // You might want to send a notification email to the customer here
      console.log(`Refund successful for payment ${payload.originalPaymentId}: ${payload.refundId}`);

    } else if (isFailedStatus(payload.status)) {
      // Refund failed - log and potentially notify admin
      console.error(`Refund failed for payment ${payload.originalPaymentId}:`, {
        refundId: payload.refundId,
        reason: payload.reason,
        rejectionReason: payload.rejectionReason
      });

      // Update the order to indicate refund failure
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ 
          payment_status: 'refund_failed',
          refund_failure_reason: payload.rejectionReason || payload.reason,
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.originalPaymentId);

      if (updateError) {
        console.error('Error updating order status for failed refund:', updateError);
      }
    } else {
      // Pending or other status - just log
      console.log(`Refund status update for payment ${payload.originalPaymentId}: ${payload.status}`);
    }

    // Always return success to PawaPay to acknowledge receipt
    return NextResponse.json({ 
      success: true, 
      message: 'Refund callback processed successfully',
      refundId: payload.refundId
    });

  } catch (error) {
    console.error('PawaPay refund callback error:', error);
    
    // Return success to prevent PawaPay from retrying, but log the error
    return NextResponse.json({ 
      success: true, 
      message: 'Callback received but processing encountered an error' 
    });
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'active',
    endpoint: 'PawaPay Refund Callback',
    timestamp: new Date().toISOString()
  });
}