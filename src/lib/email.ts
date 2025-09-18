import emailjs from '@emailjs/browser';

// EmailJS initialization is handled in the EmailJSInit component

interface EmailData {
  orderID: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  totalPrice: number;
  extraPages?: number;
  addons?: string[];
  maintenance?: number;
  businessSummary?: string;
  projectGoals?: string;
  contactMethod?: string;
  referrerName?: string;
}

export async function sendQuoteConfirmationEmail(data: EmailData) {
  try {
    // Prepare the email template parameters
    const templateParams = {
      // Required EmailJS fields
      from_email: data.clientEmail,
      from_name: data.clientName,
      
      // Template-specific fields
      to_email: data.clientEmail,
      to_name: data.clientName,
      order_id: data.orderID,
      package_name: data.packageName,
      total_price: `K${data.totalPrice.toLocaleString()}`,
      extra_pages: data.extraPages || 0,
      addons: data.addons?.join(', ') || 'None',
      maintenance: data.maintenance ? `K${data.maintenance}/month` : 'None',
      business_summary: data.businessSummary || 'Not provided',
      project_goals: data.projectGoals || 'Not provided',
      contact_method: data.contactMethod || 'Email',
      referrer: data.referrerName || 'Direct',
      
      // Additional fields for the email template
      company_name: 'Tanshi Digital Solutions',
      company_email: 'info@tanshidigital.com',
      company_phone: '+260 571 442 097',
      tracking_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://tanshidigital.com'}/track-order?orderId=${data.orderID}`,
      
      // Current date
      quote_date: new Date().toLocaleDateString('en-ZM', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    // Send email using EmailJS (using the auto-reply template for client confirmation)
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_nmjkn79',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_jy6xtqc',
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

// Function to send admin notification
export async function sendAdminNotificationEmail(data: EmailData) {
  try {
    const templateParams = {
      // Required EmailJS fields
      from_name: data.clientName,
      from_email: data.clientEmail,
      
      // Template-specific fields
      order_id: data.orderID,
      client_name: data.clientName,
      client_email: data.clientEmail,
      package_name: data.packageName,
      total_price: `K${data.totalPrice.toLocaleString()}`,
      business_summary: data.businessSummary || 'Not provided',
      project_goals: data.projectGoals || 'Not provided',
      referrer: data.referrerName || 'Direct',
      
      // Admin email
      to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'mineboyobf@gmail.com',
      
      // Date and time
      submission_date: new Date().toLocaleString('en-ZM')
    };

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_nmjkn79',
      process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID || 'template_ha0atla',
      templateParams
    );

    console.log('Admin notification sent:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
}
