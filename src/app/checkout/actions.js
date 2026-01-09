'use server';

import { Resend } from 'resend';

// Initialize Resend with the provided API key
const resend = new Resend('re_U43T6RWA_3NZSiAjnorfL2uo1BCgKbDrb');

// PawaPay Configuration
const PAWAPAY_API_URL = 'https://api.pawapay.io/v2/deposits';
const PAWAPAY_API_KEY = 'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjE4MDMiLCJtYXYiOiIxIiwiZXhwIjoyMDgxNDA5MzQyLCJpYXQiOjE3NjU4NzY1NDIsInBtIjoiREFGLFBBRiIsImp0aSI6IjIxMmI5ZDQ1LWE5MmQtNDkxYy1hMmY0LTk2ODIwNGE2M2Y1MCJ9.1fzGYXtmnrBIsDOTU88-dMNUBMu6w-3wilrnBxQlQZeG6HbNXmhzqju3wv4t6dnEKsQhLaX_WHhC8uWAv9WaIA';

const PROVIDER_MAP = {
  'Airtel Money': 'AIRTEL_OAPI_ZMB',
  'MTN Money': 'MTN_MOMO_ZMB',
  'Zamtel Money': 'ZAMTEL_ZMB'
};

export async function initiatePayment(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const payment_method = formData.get('payment_method');
  // We ignore the package price for the actual charge and use K1 for testing
  const amount = "1";

  if (!name || !email || !phone || !payment_method) {
    return { success: false, error: 'Missing required fields' };
  }

  const provider = PROVIDER_MAP[payment_method];
  if (!provider) {
    return { success: false, error: 'Invalid payment method' };
  }

  // Format phone number: ensure it starts with 260
  let formattedPhone = phone.replace(/\D/g, ''); // start by removing non-digits
  if (formattedPhone.startsWith('09') || formattedPhone.startsWith('07')) {
    formattedPhone = '260' + formattedPhone.substring(1);
  } else if (formattedPhone.startsWith('9') || formattedPhone.startsWith('7')) {
    formattedPhone = '260' + formattedPhone;
  }

  if (!formattedPhone.startsWith('260') || formattedPhone.length !== 12) {
    console.warn("Phone number might be incorrectly formatted:", formattedPhone);
  }


  const uniqueId = crypto.randomUUID();
  const orderId = `ORD-${Date.now()}`;

  const payload = {
    depositId: uniqueId,
    payer: {
      type: "MMO",
      accountDetails: {
        phoneNumber: formattedPhone,
        provider: provider
      }
    },
    amount: amount,
    currency: "ZMW",
    clientReferenceId: orderId,
    customerMessage: "Tanshi Digital Payment",
    metadata: [
      { orderId: orderId },
      { customerId: email, isPII: true }
    ]
  };

  try {
    const response = await fetch(PAWAPAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAWAPAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('PawaPay Init Error:', data);
      return { success: false, error: data.message || 'Payment initiation failed' };
    }

    return {
      success: true,
      depositId: data.depositId,
      status: data.status
    };
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: 'Network error initiating payment' };
  }
}

export async function checkPaymentStatus(depositId) {
  try {
    const response = await fetch(`${PAWAPAY_API_URL}/${depositId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAWAPAY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // Check specific structure based on API response
    // If successful: { data: { status: "COMPLETED", ... }, status: "FOUND" }
    // If pending/processing: { data: { status: "ACCEPTED" (or other), ... }, status: "FOUND" }

    if (data.status === 'FOUND' && data.data) {
      return {
        success: true,
        status: data.data.status,
        paymentData: data.data
      };
    } else if (data.status === 'NOT_FOUND') {
      // Assume pending/not propagated if immediately checked, or actual error.
      // Returning PENDING keeps polling alive.
      return { success: true, status: 'PENDING' };
    }

    return { success: false, error: 'Unable to check status' };

  } catch (error) {
    console.error('Check Status Error:', error);
    return { success: false, error: 'Network error checking status' };
  }
}

export async function sendReceiptEmail(email, package_name, amount, payment_method) {
  try {
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
      return { success: false, error: error.message };
    }
    return { success: true, messageId: data.id };
  } catch (err) {
    console.error('Email Sending Error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
