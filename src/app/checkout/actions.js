'use server';

import { Resend } from 'resend';

// Initialize Resend with the provided API key
const resend = new Resend('re_U43T6RWA_3NZSiAjnorfL2uo1BCgKbDrb');

export async function processPaymentAndSendEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const package_name = formData.get('package_name');
    const amount = formData.get('amount');
    const payment_method = formData.get('payment_method');

    // Simulate payment processing validation
    if (!name || !email || !phone || !payment_method) {
        return { success: false, error: 'Missing required fields' };
    }

    try {
        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Tanshi Digital <info@tanshidigital.com>',
            to: [email],
            subject: `Payment Receipt - ${package_name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #3b82f6;">Payment Successful!</h1>
            <p style="color: #666; font-size: 16px;">Thank you for your purchase.</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; font-size: 18px; margin-top: 0;">Transaction Details</h2>
            <div style="margin-bottom: 10px;"><strong>Package:</strong> ${package_name}</div>
            <div style="margin-bottom: 10px;"><strong>Amount Paid:</strong> ${new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(amount)}</div>
            <div style="margin-bottom: 10px;"><strong>Payment Method:</strong> ${payment_method}</div>
            <div style="margin-bottom: 10px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center; color: #888; font-size: 14px;">
            <p>If you have any questions, please contact us at info@tanshidigital.com</p>
            <p>&copy; ${new Date().getFullYear()} Tanshi Digital Solutions. All rights reserved.</p>
          </div>
        </div>
      `,
        });

        if (error) {
            console.error('Resend Error:', error);
            // In a real app we might want to fail here, but for this demo let's allow "success" 
            // even if email fails, but log it. Ideally we return the error.
            return { success: true, emailSent: false, error: error.message };
        }

        return { success: true, emailSent: true, messageId: data.id };
    } catch (err) {
        console.error('Payment Action Error:', err);
        return { success: false, error: 'Failed to process payment' };
    }
}
