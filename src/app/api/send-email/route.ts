import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      type, 
      name, 
      email, 
      phone, 
      message, 
      packageData, 
      businessSummary, 
      projectGoals,
      contactMethod,
      referralCode,
      // Order update fields
      orderData,
      updateMessage,
      updateType,
      orderStatus
    } = body;

    let emailData;

    if (type === 'quote') {
      // Quote request email
      emailData = {
        from: 'Tanshi Digital Solutions <noreply@tanshidigital.com>',
        to: ['info@tanshidigital.com'],
        subject: `New Web Development Quote Request - ${packageData?.name || 'Custom'} Package`,
        html: generateQuoteEmailHTML({
          name,
          email,
          phone,
          packageData,
          businessSummary,
          projectGoals,
          contactMethod,
          referralCode
        }),
        replyTo: email
      };

      // Send confirmation email to client
      const confirmationEmail = {
        from: 'Tanshi Digital Solutions <noreply@tanshidigital.com>',
        to: [email],
        subject: 'Quote Request Received - Tanshi Digital Solutions',
        html: generateQuoteConfirmationHTML({
          name,
          packageData
        })
      };

      // Send both emails
      const [businessEmail, clientEmail] = await Promise.all([
        resend.emails.send(emailData),
        resend.emails.send(confirmationEmail)
      ]);

      return NextResponse.json({ 
        success: true, 
        businessEmailId: businessEmail.data?.id,
        clientEmailId: clientEmail.data?.id
      });

    } else if (type === 'contact') {
      // Contact form email
      emailData = {
        from: 'Tanshi Digital Solutions <noreply@tanshidigital.com>',
        to: ['info@tanshidigital.com'],
        subject: `New Contact Form Submission from ${name}`,
        html: generateContactEmailHTML({
          name,
          email,
          phone,
          message
        }),
        replyTo: email
      };

      // Send confirmation email to client
      const confirmationEmail = {
        from: 'Tanshi Digital Solutions <noreply@tanshidigital.com>',
        to: [email],
        subject: 'Message Received - Tanshi Digital Solutions',
        html: generateContactConfirmationHTML({ name })
      };

      // Send both emails
      const [businessEmail, clientEmail] = await Promise.all([
        resend.emails.send(emailData),
        resend.emails.send(confirmationEmail)
      ]);

      return NextResponse.json({ 
        success: true, 
        businessEmailId: businessEmail.data?.id,
        clientEmailId: clientEmail.data?.id
      });

    } else if (type === 'order_update') {
      // Order update email
      const customerEmail = {
        from: 'Tanshi Digital Solutions <noreply@tanshidigital.com>',
        to: [email],
        subject: generateOrderUpdateSubject(orderData, updateType),
        html: generateOrderUpdateEmailHTML({
          name,
          orderData,
          updateMessage,
          updateType,
          orderStatus
        })
      };

      const result = await resend.emails.send(customerEmail);

      return NextResponse.json({ 
        success: true, 
        emailId: result.data?.id
      });
    }

    return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });

  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Quote email template for business
function generateQuoteEmailHTML({ name, email, phone, packageData, businessSummary, projectGoals, contactMethod, referralCode }: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3B82F6, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Quote Request</h1>
            <p style="color: #E0F2FE; margin: 10px 0 0 0; font-size: 16px;">Web Development Services</p>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #3B82F6;">
            <h2 style="color: #1e40af; margin-top: 0;">Client Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                    <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3B82F6;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #3B82F6;">${phone}</a></td>
                </tr>
                ` : ''}
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Preferred Contact:</td>
                    <td style="padding: 8px 0;">${contactMethod || 'Email'}</td>
                </tr>
            </table>
        </div>

        <div style="background: white; padding: 25px; border-radius: 8px; border: 2px solid #E5E7EB; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Package Details</h2>
            <div style="background: linear-gradient(135deg, #EFF6FF, #DBEAFE); padding: 20px; border-radius: 6px;">
                <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 20px;">${packageData?.name || 'Custom'} Package</h3>
                ${packageData?.price && packageData.price !== 'Contact for Pricing' && packageData.price !== 'Custom Pricing' ? 
                  `<p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold; color: #059669;">Total: K${typeof packageData.price === 'number' ? packageData.price.toLocaleString() : packageData.price}</p>` : 
                  '<p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold; color: #D97706;">Custom Pricing Required</p>'
                }
                
                ${packageData?.breakdown && packageData.breakdown.length > 0 ? `
                <h4 style="margin: 15px 0 10px 0; color: #374151;">Cost Breakdown:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    ${packageData.breakdown.map((item: any) => `
                        <li style="margin: 5px 0; color: #4B5563;">
                            ${item.name}: ${item.price > 0 ? `K${item.price.toLocaleString()}` : 'FREE'}
                        </li>
                    `).join('')}
                </ul>
                ` : ''}

                ${packageData?.extraPages > 0 ? `
                <p style="margin: 10px 0; color: #4B5563;">Additional Pages: <strong>${packageData.extraPages}</strong></p>
                ` : ''}

                ${packageData?.maintenance > 0 ? `
                <p style="margin: 10px 0; color: #4B5563;">Maintenance Plan: <strong>K${packageData.maintenance}/month</strong></p>
                ` : ''}
            </div>
        </div>

        ${businessSummary ? `
        <div style="background: white; padding: 25px; border-radius: 8px; border: 2px solid #E5E7EB; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Business Summary</h3>
            <p style="margin: 0; color: #4B5563; line-height: 1.6;">${businessSummary}</p>
        </div>
        ` : ''}

        ${projectGoals ? `
        <div style="background: white; padding: 25px; border-radius: 8px; border: 2px solid #E5E7EB; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Project Goals</h3>
            <p style="margin: 0; color: #4B5563; line-height: 1.6;">${projectGoals}</p>
        </div>
        ` : ''}

        ${referralCode ? `
        <div style="background: #FEF3C7; padding: 15px; border-radius: 6px; border-left: 4px solid #F59E0B; margin: 20px 0;">
            <p style="margin: 0; color: #92400E;"><strong>Referral Code:</strong> ${referralCode}</p>
        </div>
        ` : ''}

        <div style="background: #1F2937; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
            <p style="margin: 0; font-size: 14px;">
                Respond within 24 hours for the best customer experience!
            </p>
            <div style="margin-top: 15px;">
                <a href="mailto:${email}" style="background: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">Reply via Email</a>
                ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">WhatsApp</a>` : ''}
            </div>
        </div>
    </body>
    </html>
  `;
}

// Helper function to generate subject for order updates
function generateOrderUpdateSubject(orderData: any, updateType: string) {
  const orderNumber = orderData?.order_id || orderData?.id || 'Your Order';
  
  switch (updateType) {
    case 'success':
      return `🎉 Great News About Order ${orderNumber} - Tanshi Digital`;
    case 'warning':
      return `⚠️ Important Update for Order ${orderNumber} - Tanshi Digital`;
    case 'payment':
      return `💳 Payment Update for Order ${orderNumber} - Tanshi Digital`;
    case 'completed':
      return `✅ Order ${orderNumber} Complete - Tanshi Digital`;
    default:
      return `📋 Update on Order ${orderNumber} - Tanshi Digital`;
  }
}

// Order update email template
function generateOrderUpdateEmailHTML({ name, orderData, updateMessage, updateType, orderStatus }: any) {
  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'payment': return '💳';
      case 'completed': return '🎉';
      default: return '📋';
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'success': return { bg: '#10B981', light: '#ECFDF5', border: '#059669' };
      case 'warning': return { bg: '#F59E0B', light: '#FEF3C7', border: '#D97706' };
      case 'payment': return { bg: '#8B5CF6', light: '#F3E8FF', border: '#7C3AED' };
      case 'completed': return { bg: '#059669', light: '#D1FAE5', border: '#047857' };
      default: return { bg: '#3B82F6', light: '#EFF6FF', border: '#2563EB' };
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return { bg: '#ECFDF5', color: '#065F46', border: '#10B981' };
      case 'in_progress':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#3B82F6' };
      case 'submitted':
        return { bg: '#FEF3C7', color: '#92400E', border: '#F59E0B' };
      case 'cancelled':
        return { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#64748B' };
    }
  };

  const colors = getUpdateColor(updateType);
  const statusStyle = getStatusBadgeStyle(orderStatus);
  const icon = getUpdateIcon(updateType);

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Update - Tanshi Digital Solutions</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F9FAFB;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${colors.bg}, #06B6D4); padding: 40px 30px; border-radius: 16px; text-align: center; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <div style="font-size: 48px; margin-bottom: 10px;">${icon}</div>
            <h1 style="color: white; margin: 0 0 10px 0; font-size: 28px; font-weight: 700;">Order Update</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">We have news about your project</p>
        </div>
        
        <!-- Greeting -->
        <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;">
            <h2 style="color: #1F2937; margin: 0 0 15px 0; font-size: 24px;">Hi ${name} 👋</h2>
            <p style="color: #4B5563; margin: 0; font-size: 16px; line-height: 1.6;">
                We have an important update regarding your project with Tanshi Digital Solutions. Here's what's happening with your order:
            </p>
        </div>

        <!-- Order Information -->
        <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;">
            <h3 style="color: #1F2937; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center; gap: 10px;">
                📋 Order Details
            </h3>
            
            <div style="display: grid; gap: 15px;">
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
                    <span style="font-weight: 600; color: #374151;">Order ID:</span>
                    <span style="color: #1F2937; font-family: monospace; background: #F3F4F6; padding: 4px 8px; border-radius: 4px; font-size: 14px;">#${orderData?.order_id || orderData?.id}</span>
                </div>
                
                ${orderData?.package_name ? `
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
                    <span style="font-weight: 600; color: #374151;">Package:</span>
                    <span style="color: #1F2937;">${orderData.package_name}</span>
                </div>
                ` : ''}
                
                ${orderData?.total_price ? `
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
                    <span style="font-weight: 600; color: #374151;">Total:</span>
                    <span style="color: #059669; font-weight: 700;">K${orderData.total_price.toLocaleString()}</span>
                </div>
                ` : ''}
                
                ${orderStatus ? `
                <div style="display: flex; justify-content: space-between; padding: 12px 0; align-items: center;">
                    <span style="font-weight: 600; color: #374151;">Status:</span>
                    <span style="background: ${statusStyle.bg}; color: ${statusStyle.color}; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; border: 1px solid ${statusStyle.border};">
                        ${orderStatus.replace('_', ' ').toUpperCase()}
                    </span>
                </div>
                ` : ''}
            </div>
        </div>

        <!-- Update Message -->
        <div style="background: ${colors.light}; padding: 30px; border-radius: 12px; margin-bottom: 25px; border: 2px solid ${colors.border}; position: relative;">
            <div style="position: absolute; top: -15px; left: 20px; background: ${colors.bg}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                ${updateType.charAt(0).toUpperCase() + updateType.slice(1)} Update
            </div>
            <div style="margin-top: 15px;">
                <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px;">Latest Update</h3>
                <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${updateMessage}</p>
            </div>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.1);">
                <p style="color: #6B7280; margin: 0; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                    🕐 Updated: ${new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                </p>
            </div>
        </div>

        <!-- Action Buttons -->
        <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #E5E7EB; text-align: center;">
            <h3 style="color: #1F2937; margin: 0 0 20px 0; font-size: 18px;">Need to get in touch?</h3>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="https://wa.me/260571442097" 
                   style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                    📱 WhatsApp Us
                </a>
                <a href="mailto:info@tanshidigital.com" 
                   style="background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    📧 Email Us
                </a>
            </div>
        </div>

        <!-- Track Order -->
        ${orderData?.order_id ? `
        <div style="background: #F8FAFC; padding: 25px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #E2E8F0; text-align: center;">
            <h4 style="color: #475569; margin: 0 0 15px 0; font-size: 16px;">Want to track your order progress?</h4>
            <a href="https://tanshidigital.com/track-order?id=${orderData.order_id}" 
               style="background: white; color: #475569; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; border: 2px solid #E2E8F0; transition: all 0.3s ease;">
                🔍 Track Order #${orderData.order_id}
            </a>
        </div>
        ` : ''}

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #1F2937, #374151); color: white; padding: 30px; border-radius: 12px; text-align: center;">
            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #60A5FA; font-size: 22px;">Tanshi Digital Solutions</h3>
                <p style="margin: 0; color: #D1D5DB; font-size: 16px; font-weight: 500;">Empowering Innovation Through Technology</p>
            </div>
            
            <div style="display: grid; gap: 8px; margin: 20px 0;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #D1D5DB;">
                    <span>📧</span>
                    <a href="mailto:info@tanshidigital.com" style="color: #60A5FA; text-decoration: none;">info@tanshidigital.com</a>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #D1D5DB;">
                    <span>📱</span>
                    <a href="tel:+260571442097" style="color: #60A5FA; text-decoration: none;">+260 571 442 097</a>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #D1D5DB;">
                    <span>🌐</span>
                    <a href="https://tanshidigital.com" style="color: #60A5FA; text-decoration: none;">tanshidigital.com</a>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #D1D5DB;">
                    <span>📍</span>
                    <span>Lusaka, Zambia</span>
                </div>
            </div>
            
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #374151;">
                <p style="margin: 0; color: #9CA3AF; font-size: 14px;">Thank you for choosing Tanshi Digital Solutions</p>
            </div>
        </div>

        <!-- Social Media & Trust Indicators -->
        <div style="text-align: center; margin-top: 20px; padding: 15px;">
            <p style="color: #6B7280; font-size: 12px; margin: 0;">This email was sent regarding your active project with Tanshi Digital Solutions.</p>
            <p style="color: #9CA3AF; font-size: 11px; margin: 5px 0 0 0;">© 2024 Tanshi Digital Solutions. All rights reserved.</p>
        </div>
    </body>
    </html>
  `;
}

// Quote confirmation email for client
function generateQuoteConfirmationHTML({ name, packageData }: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Request Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3B82F6, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #E0F2FE; margin: 10px 0 0 0; font-size: 16px;">Your quote request has been received</p>
        </div>

        <div style="background: #f8fafc; padding: 25px; border-radius: 8px;">
            <h2 style="color: #1e40af; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #4B5563; margin-bottom: 20px;">
                Thank you for your interest in our web development services! We've received your quote request for the <strong>${packageData?.name || 'Custom'} Package</strong>.
            </p>
            
            <div style="background: #EFF6FF; padding: 20px; border-radius: 6px; border-left: 4px solid #3B82F6; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #1e40af;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
                    <li style="margin: 8px 0;">Our team will review your requirements within 24 hours</li>
                    <li style="margin: 8px 0;">We'll prepare a detailed proposal and timeline</li>
                    <li style="margin: 8px 0;">You'll receive a follow-up call or email with next steps</li>
                    <li style="margin: 8px 0;">We'll schedule a consultation to discuss your project</li>
                </ul>
            </div>

            <p style="color: #4B5563; margin: 20px 0;">
                In the meantime, feel free to reach out if you have any questions or would like to discuss your project further.
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://wa.me/260571442097" style="background: #10B981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block;">WhatsApp Us</a>
                <a href="mailto:info@tanshidigital.com" style="background: #3B82F6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block;">Email Us</a>
            </div>
        </div>

        <div style="background: #1F2937; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #60A5FA;">Tanshi Digital Solutions</h3>
            <p style="margin: 5px 0; color: #D1D5DB;">📧 info@tanshidigital.com</p>
            <p style="margin: 5px 0; color: #D1D5DB;">📱 +260 571 442 097</p>
            <p style="margin: 5px 0; color: #D1D5DB;">🌐 tanshidigital.com</p>
            <p style="margin: 15px 0 5px 0; color: #9CA3AF; font-size: 14px;">Empowering Innovation Through Technology</p>
        </div>
    </body>
    </html>
  `;
}

// Contact email template for business
function generateContactEmailHTML({ name, email, phone, message }: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10B981, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Message</h1>
            <p style="color: #A7F3D0; margin: 10px 0 0 0; font-size: 16px;">Someone wants to get in touch!</p>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #10B981;">
            <h2 style="color: #065f46; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                    <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #10B981;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #10B981;">${phone}</a></td>
                </tr>
                ` : ''}
            </table>
        </div>

        <div style="background: white; padding: 25px; border-radius: 8px; border: 2px solid #E5E7EB; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">Message</h3>
            <div style="background: #F0FDF4; padding: 20px; border-radius: 6px; border-left: 4px solid #10B981;">
                <p style="margin: 0; color: #14532D; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
        </div>

        <div style="background: #1F2937; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
            <p style="margin: 0; font-size: 14px;">
                Respond promptly to maintain excellent customer service!
            </p>
            <div style="margin-top: 15px;">
                <a href="mailto:${email}" style="background: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">Reply via Email</a>
                ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">WhatsApp</a>` : ''}
            </div>
        </div>
    </body>
    </html>
  `;
}

// Contact confirmation email for client
function generateContactConfirmationHTML({ name }: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10B981, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Message Received!</h1>
            <p style="color: #A7F3D0; margin: 10px 0 0 0; font-size: 16px;">We'll get back to you soon</p>
        </div>

        <div style="background: #f8fafc; padding: 25px; border-radius: 8px;">
            <h2 style="color: #065f46; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #4B5563; margin-bottom: 20px;">
                Thank you for reaching out to Tanshi Digital Solutions! We've received your message and appreciate you taking the time to contact us.
            </p>
            
            <div style="background: #ECFDF5; padding: 20px; border-radius: 6px; border-left: 4px solid #10B981; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #065f46;">What's next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
                    <li style="margin: 8px 0;">We'll review your message carefully</li>
                    <li style="margin: 8px 0;">Our team will respond within 24 hours</li>
                    <li style="margin: 8px 0;">We'll provide you with the information you need</li>
                    <li style="margin: 8px 0;">If needed, we'll schedule a consultation call</li>
                </ul>
            </div>

            <p style="color: #4B5563; margin: 20px 0;">
                For urgent matters, feel free to call or WhatsApp us directly at +260 571 442 097.
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://wa.me/260571442097" style="background: #10B981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block;">WhatsApp Us</a>
                <a href="tel:+260571442097" style="background: #3B82F6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block;">Call Us</a>
            </div>
        </div>

        <div style="background: #1F2937; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #60A5FA;">Tanshi Digital Solutions</h3>
            <p style="margin: 5px 0; color: #D1D5DB;">📧 info@tanshidigital.com</p>
            <p style="margin: 5px 0; color: #D1D5DB;">📱 +260 571 442 097</p>
            <p style="margin: 5px 0; color: #D1D5DB;">🌐 tanshidigital.com</p>
            <p style="margin: 5px 0; color: #D1D5DB;">📍 Lusaka, Zambia</p>
            <p style="margin: 15px 0 5px 0; color: #9CA3AF; font-size: 14px;">Empowering Innovation Through Technology</p>
        </div>
    </body>
    </html>
  `;
}