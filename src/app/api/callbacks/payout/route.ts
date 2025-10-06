import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  PawaPayPayoutCallback, 
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
      console.error('PawaPay payout callback: Invalid signature');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the JSON payload
    let payload: PawaPayPayoutCallback;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      console.error('PawaPay payout callback: Invalid JSON payload', error);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate payload structure
    if (!payload.paymentId || !payload.payoutId || !payload.status) {
      console.error('PawaPay payout callback: Missing required fields', payload);
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract callback data for storage
    const callbackData = extractCallbackData(payload);

    // Log the callback for debugging
    console.log('PawaPay payout callback received:', {
      payoutId: payload.payoutId,
      paymentId: payload.paymentId,
      status: payload.status,
      amount: payload.amount,
      currency: payload.currency,
      customerName: payload.customer.customerName,
      phoneNumber: payload.customer.phoneNumber
    });

    // Store the callback in database
    const { error: callbackError } = await supabase
      .from('pawapay_callbacks')
      .upsert([{
        payment_id: payload.paymentId,
        payout_id: payload.payoutId,
        callback_type: 'PAYOUT',
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
      console.error('Error storing PawaPay payout callback:', callbackError);
      // Don't return error to PawaPay - we still processed the callback
    }

    // Update related transaction/withdrawal status based on payout status
    if (isSuccessfulStatus(payload.status)) {
      // Payout was successful - update any related transactions
      const { error: updateError } = await supabase
        .from('payouts')  // Assuming you have a payouts table
        .update({ 
          status: 'completed',
          payout_id: payload.payoutId,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.paymentId);

      if (updateError) {
        console.error('Error updating payout status for successful transaction:', updateError);
      }

      // You might also want to update user balances or notify the recipient
      console.log(`Payout successful: ${payload.payoutId} - ${payload.amount} ${payload.currency} to ${payload.customer.phoneNumber}`);

      // Optional: Send confirmation notification to the recipient
      // await sendPayoutNotificationEmail(payload);

    } else if (isFailedStatus(payload.status)) {
      // Payout failed - update status and potentially refund or retry
      console.error(`Payout failed: ${payload.payoutId}:`, {
        reason: payload.reason,
        rejectionReason: payload.rejectionReason,
        customerPhone: payload.customer.phoneNumber
      });

      // Update the payout to indicate failure
      const { error: updateError } = await supabase
        .from('payouts')
        .update({ 
          status: 'failed',
          failure_reason: payload.rejectionReason || payload.reason,
          failed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.paymentId);

      if (updateError) {
        console.error('Error updating payout status for failed transaction:', updateError);
      }

      // You might want to:
      // 1. Credit back user's account balance
      // 2. Send notification to admin for manual review
      // 3. Notify the user about the failed payout
      
    } else {
      // Pending or other status - just log and wait
      console.log(`Payout status update: ${payload.payoutId} - ${payload.status}`);
      
      // Update status to pending/processing
      const { error: updateError } = await supabase
        .from('payouts')
        .update({ 
          status: payload.status.toLowerCase(),
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.paymentId);

      if (updateError) {
        console.error('Error updating payout status:', updateError);
      }
    }

    // Always return success to PawaPay to acknowledge receipt
    return NextResponse.json({ 
      success: true, 
      message: 'Payout callback processed successfully',
      payoutId: payload.payoutId
    });

  } catch (error) {
    console.error('PawaPay payout callback error:', error);
    
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
    endpoint: 'PawaPay Payout Callback',
    timestamp: new Date().toISOString()
  });
}