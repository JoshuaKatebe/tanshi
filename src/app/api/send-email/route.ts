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
      referralCode
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