import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateAuthToken } from '@/lib/auth';

export async function GET(request: Request) {
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

    // Fetch all quotes with related data
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select(`
        *,
        contacts (
          name,
          email,
          phone,
          contact_method
        ),
        quote_details (
          business_summary,
          project_goals,
          file_url
        ),
        referrals (
          referrer_name,
          code
        ),
        progress_messages (
          id,
          message,
          status,
          created_at,
          created_by
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      quotes
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch quotes' },
      { status: 500 }
    );
  }
}
