import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Fetch quote with related data
    const { data: quote, error } = await supabase
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
      .eq('order_id', orderId)
      .single();

    if (error || !quote) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quote
    });

  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to track order' },
      { status: 500 }
    );
  }
}
