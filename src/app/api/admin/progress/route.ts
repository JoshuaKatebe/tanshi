import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateAuthToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !validateAuthToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { quote_id, message, status, update_quote_status } = await request.json();

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
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ 
          status: update_quote_status,
          updated_at: new Date().toISOString()
        })
        .eq('id', quote_id);

      if (updateError) {
        throw updateError;
      }
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
    }
    
    return NextResponse.json(
      { success: false, message: userMessage, error: errorMessage },
      { status: statusCode }
    );
  }
}
