import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateAuthToken } from '@/lib/auth';
import { sendOrderUpdateEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !validateAuthToken(token)) {
      console.log('[Admin Progress API] Authentication failed');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const requestBody = await request.json();
    const { quote_id, message, status, update_quote_status } = requestBody;
    
    console.log('[Admin Progress API] Request received:', {
      quote_id,
      message,
      status,
      update_quote_status,
      requestBody
    });

    if (!quote_id || !message || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add progress message
    const { data: progressMessage, error: progressError } = await supabase
      .from('progress_messages')
      .insert([{
        quote_id,
        message,
        status,
        created_by: 'admin'
      }])
      .select()
      .single();

    if (progressError) {
      throw progressError;
    }

    // Update quote status if requested
    if (update_quote_status) {
      console.log('[Admin Progress API] Updating quote status to:', update_quote_status);
      console.log('[Admin Progress API] Valid statuses: submitted, in_progress, completed, cancelled');
      
      // Validate the status value
      const validStatuses = ['submitted', 'in_progress', 'completed', 'cancelled'];
      if (!validStatuses.includes(update_quote_status)) {
        console.error('[Admin Progress API] Invalid status value:', update_quote_status);
        throw new Error(`Invalid status value: ${update_quote_status}. Must be one of: ${validStatuses.join(', ')}`);
      }
      
      const { data: updateData, error: updateError } = await supabase
        .from('quotes')
        .update({ 
          status: update_quote_status,
          updated_at: new Date().toISOString()
        })
        .eq('id', quote_id)
        .select();

      console.log('[Admin Progress API] Update result:', { updateData, updateError });

      if (updateError) {
        console.error('[Admin Progress API] Database update error:', updateError);
        throw updateError;
      }
    }

    // Get quote and customer information for email notification
    const { data: quoteData, error: quoteError } = await supabase
      .from('quotes')
      .select(`
        id,
        order_id,
        package_name,
        total_price,
        status,
        contacts (
          name,
          email
        )
      `)
      .eq('id', quote_id)
      .single();

    console.log('[Admin Progress API] Quote data for email:', { quoteData, quoteError });

    // Send email notification to customer
    if (quoteData && quoteData.contacts && quoteData.contacts[0]) {
      const customerData = quoteData.contacts[0];
      
      console.log('[Admin Progress API] Sending email notification to:', customerData.email);
      
      try {
        const emailResult = await sendOrderUpdateEmail({
          customerName: customerData.name,
          customerEmail: customerData.email,
          order_id: quoteData.order_id,
          package_name: quoteData.package_name,
          total_price: quoteData.total_price,
          status: update_quote_status || quoteData.status,
          message: message,
          updateType: status as 'info' | 'success' | 'warning' | 'payment'
        });
        
        console.log('[Admin Progress API] Email notification result:', emailResult);
        
        if (!emailResult.success) {
          console.warn('[Admin Progress API] Email notification failed, but continuing with response:', emailResult.error);
        }
      } catch (emailError) {
        console.error('[Admin Progress API] Email notification error:', emailError);
        // Don't fail the entire request if email fails
      }
    } else {
      console.warn('[Admin Progress API] No customer contact information found for email notification');
    }

    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      progressMessage
    });

  } catch (error) {
    console.error('Error updating progress:', error);
    
    // More specific error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    let statusCode = 500;
    let userMessage = 'Unable to update progress';
    
    // Check for specific database errors
    if (errorMessage.includes('relation "progress_messages" does not exist')) {
      userMessage = 'Progress messages table not found. Please run database setup.';
      statusCode = 503;
    } else if (errorMessage.includes('row-level security policy')) {
      userMessage = 'Database permission error. Please check RLS policies.';
      statusCode = 403;
    } else if (errorMessage.includes('violates check constraint "quotes_status_check"')) {
      userMessage = 'Invalid status value. Valid values are: submitted, in_progress, completed, cancelled';
      statusCode = 400;
    } else if (errorMessage.includes('Invalid status value')) {
      userMessage = errorMessage; // Use our custom validation message
      statusCode = 400;
    }
    
    return NextResponse.json(
      { success: false, message: userMessage, error: errorMessage },
      { status: statusCode }
    );
  }
}
