import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateOrderId } from '@/lib/utils';
import { sendQuoteConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      package_name, 
      package_price, 
      extra_pages, 
      addons, 
      maintenance, 
      total_price, 
      contact,
      quote_details,
      referral
    } = body;

    // Generate a unique order ID
    const order_id = generateOrderId();

    // Insert new quote into the database
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert([{ 
        order_id, 
        package_name, 
        package_price, 
        extra_pages, 
        addons, 
        maintenance, 
        total_price, 
        status: 'submitted' 
      }])
      .select()
      .single();

    if (quoteError) throw quoteError;

    // Insert contact information
    const { error: contactError } = await supabase
      .from('contacts')
      .insert([{ 
        quote_id: quote.id, 
        ...contact 
      }]);

    if (contactError) throw contactError;

    // Insert quote details if provided
    if (quote_details) {
      const { error: detailsError } = await supabase
        .from('quote_details')
        .insert([{ 
          quote_id: quote.id, 
          ...quote_details 
        }]);

      if (detailsError) throw detailsError;
    }

    // Insert referral if provided
    if (referral?.referrer_name) {
      const { error: referralError } = await supabase
        .from('referrals')
        .insert([{ 
          quote_id: quote.id, 
          ...referral 
        }]);

      if (referralError) throw referralError;
    }

// Send email notification with order_id
// Removed server-side email sending. Handled client-side.
    // await sendQuoteConfirmationEmail({
    //   orderID: order_id,
    //   clientName: contact.name,
    //   clientEmail: contact.email,
    //   packageName: package_name,
    //   totalPrice: total_price,
    //   extraPages: extra_pages,
    //   addons: addons.map((addon: any) => addon.name),
    //   maintenance,
    //   businessSummary: quote_details?.business_summary,
    //   projectGoals: quote_details?.project_goals,
    //   contactMethod: contact.contact_method,
    //   referrerName: referral?.referrer_name,
    // });

    return NextResponse.json({ 
      success: true, 
      order_id,
      quote_id: quote.id 
    });
    
  } catch (error) {
    console.error('Error submitting quote:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to submit quote' },
      { status: 500 }
    );
  }
}
