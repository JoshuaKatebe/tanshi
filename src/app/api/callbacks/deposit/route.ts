import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  PawaPayDepositCallback, 
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
      console.error('PawaPay deposit callback: Invalid signature');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the JSON payload
    let payload: PawaPayDepositCallback;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      console.error('PawaPay deposit callback: Invalid JSON payload', error);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate payload structure
    if (!payload.paymentId || !payload.depositId || !payload.status) {
      console.error('PawaPay deposit callback: Missing required fields', payload);
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract callback data for storage
    const callbackData = extractCallbackData(payload);

    // Log the callback for debugging
    console.log('PawaPay deposit callback received:', {
      depositId: payload.depositId,
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
        deposit_id: payload.depositId,
        callback_type: 'DEPOSIT',
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
      console.error('Error storing PawaPay deposit callback:', callbackError);
      // Don't return error to PawaPay - we still processed the callback
    }

    // Update related order/payment status based on deposit status
    if (isSuccessfulStatus(payload.status)) {
      // Deposit was successful - update the related order status
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ 
          status: 'paid',
          payment_status: 'completed',
          payment_id: payload.paymentId,
          deposit_id: payload.depositId,
          paid_amount: payload.amount,
          paid_currency: payload.currency,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.paymentId);

      if (updateError) {
        console.error('Error updating order status for successful deposit:', updateError);
        
        // Try alternative approach - find by order_id or other identifier if payment_id doesn't exist
        // This might be needed if the deposit callback comes before you've stored the payment_id
        console.log('Attempting to find order by deposit reference...');
        // You might need custom logic here based on how you link deposits to orders
      }

      // You might want to:
      // 1. Send payment confirmation email to customer
      // 2. Trigger order fulfillment process
      // 3. Update inventory if applicable
      // 4. Notify admin of successful payment
      
      console.log(`Deposit successful: ${payload.depositId} - ${payload.amount} ${payload.currency} from ${payload.customer.phoneNumber}`);

      // Optional: Send confirmation notification
      // await sendPaymentConfirmationEmail(payload);

    } else if (isFailedStatus(payload.status)) {
      // Deposit failed - update status and handle accordingly
      console.error(`Deposit failed: ${payload.depositId}:`, {
        reason: payload.reason,
        rejectionReason: payload.rejectionReason,
        customerPhone: payload.customer.phoneNumber,
        amount: payload.amount,
        currency: payload.currency
      });

      // Update the order to indicate payment failure
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ 
          payment_status: 'failed',
          payment_failure_reason: payload.rejectionReason || payload.reason,
          failed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.paymentId);

      if (updateError) {
        console.error('Error updating order status for failed deposit:', updateError);
      }

      // You might want to:
      // 1. Send payment failure notification to customer
      // 2. Provide alternative payment options
      // 3. Notify admin for manual review
      // 4. Set order status back to pending payment
      
    } else {
      // Pending or other status - just log and wait for final status
      console.log(`Deposit status update: ${payload.depositId} - ${payload.status}`);
      
      // Update status to pending/processing
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ 
          payment_status: payload.status.toLowerCase(),
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', payload.paymentId);

      if (updateError) {
        console.error('Error updating order payment status:', updateError);
      }
    }

    // Always return success to PawaPay to acknowledge receipt
    return NextResponse.json({ 
      success: true, 
      message: 'Deposit callback processed successfully',
      depositId: payload.depositId
    });

  } catch (error) {
    console.error('PawaPay deposit callback error:', error);
    
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
    endpoint: 'PawaPay Deposit Callback',
    timestamp: new Date().toISOString()
  });
}