# Email Notifications for Order Updates

## Overview

This feature automatically sends beautiful, professional email notifications to customers when their orders are updated from the admin dashboard. It uses Resend for reliable email delivery and includes modern, responsive email templates.

## Features

- **Automatic Email Notifications**: When admins add progress updates, customers receive instant email notifications
- **Beautiful Email Templates**: Professional, mobile-responsive emails with your brand colors
- **Multiple Update Types**: Different email styles for different update types:
  - `info` - General updates and information
  - `success` - Positive news and milestones
  - `warning` - Important notices requiring attention
  - `payment` - Payment-related updates
- **Order Details**: Each email includes order ID, package name, price, and current status
- **Track Order Links**: Direct links to order tracking page
- **Contact Options**: WhatsApp and email buttons for easy customer communication

## Setup

### 1. Install Dependencies
Resend is already installed in your project.

### 2. Environment Variables
Add your Resend API key to your `.env` file:

```env
RESEND_API_KEY=your_resend_api_key
```

### 3. Get Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain (or use the sandbox for testing)
3. Generate an API key
4. Add it to your environment variables

## How It Works

### Admin Workflow
1. Admin navigates to Admin Dashboard (`/admin/dashboard`)
2. Clicks "Update Progress" on any order
3. Fills out the progress update form:
   - **Progress Message**: The update message for the customer
   - **Message Type**: Select from info, success, warning, payment
   - **Update Status** (optional): Change the order status
4. Clicks "Update Progress"
5. System automatically:
   - Saves the progress update to database
   - Sends formatted email to customer
   - Updates order status if selected

### Customer Experience
1. Customer receives email notification instantly
2. Email includes:
   - Professional header with update type icon
   - Personalized greeting
   - Order details (ID, package, price, status)
   - The progress update message
   - Action buttons (WhatsApp, Email)
   - Link to track their order
   - Your company branding

## Email Templates

The system includes responsive email templates that work across all email clients:

- **Header**: Gradient background with update type icon
- **Order Information**: Clean table layout with order details
- **Update Message**: Highlighted update with timestamp
- **Action Buttons**: Easy contact options
- **Footer**: Company information and social links

### Email Types

#### Info Updates (📋)
- Blue theme
- General project updates
- Default option

#### Success Updates (✅)
- Green theme
- Milestones, completions
- Positive news

#### Warning Updates (⚠️)
- Yellow/orange theme
- Important notices
- Issues requiring attention

#### Payment Updates (💳)
- Purple theme
- Payment confirmations
- Billing updates

## File Structure

```
src/
├── app/api/send-email/route.ts          # Email API endpoint
├── app/api/admin/progress/route.ts      # Progress update API
├── lib/email.ts                         # Email helper functions
└── app/admin/dashboard/page.tsx         # Admin dashboard UI
```

## API Endpoints

### Send Email
- **POST** `/api/send-email`
- Supports three email types: `quote`, `contact`, `order_update`
- New order update payload:

```json
{
  "type": "order_update",
  "name": "Customer Name",
  "email": "customer@example.com",
  "orderData": {
    "order_id": "TDS-QT-20241006-12345",
    "package_name": "Professional Package",
    "total_price": 5000
  },
  "updateMessage": "Your website design is complete!",
  "updateType": "success",
  "orderStatus": "in_progress"
}
```

### Update Progress
- **POST** `/api/admin/progress`
- Existing endpoint enhanced to send emails
- Automatically fetches customer contact info
- Sends notification after successful update

## Database Requirements

The feature requires these existing tables:
- `quotes` - Order information
- `contacts` - Customer contact details
- `progress_messages` - Update messages

No additional database changes required.

## Error Handling

- Email failures don't block progress updates
- Detailed logging for troubleshooting
- Graceful degradation if email service unavailable
- Admin sees progress update success even if email fails

## Testing

### Development Testing
1. Set up Resend account and get API key
2. Add test email addresses
3. Create a test order through your quote form
4. Add progress updates from admin dashboard
5. Verify emails are received and formatted correctly

### Production Checklist
- [ ] Resend domain verified
- [ ] API key added to production environment
- [ ] Email templates tested across email clients
- [ ] Admin dashboard accessible
- [ ] Customer contact information properly stored

## Customization

### Branding
- Colors: Update the gradient colors in the email templates
- Logo: Add your company logo to the header
- Contact Info: Update phone numbers and addresses

### Content
- Subject Lines: Modify in `generateOrderUpdateSubject()`
- Email Content: Update templates in `generateOrderUpdateEmailHTML()`
- Button Text: Customize action buttons

## Security

- Email API requires admin authentication
- Customer email addresses validated before sending
- No sensitive information exposed in email logs
- Secure handling of API keys

## Support

If you encounter issues:
1. Check your Resend API key is valid
2. Verify environment variables are set
3. Check browser console for errors
4. Review server logs for email sending errors

The feature is designed to be reliable and user-friendly, providing a professional experience for both administrators and customers.