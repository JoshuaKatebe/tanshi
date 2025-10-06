# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is **Tanshi Digital Solutions**, a Next.js 15 application for a Zambian digital services company. The application serves as a marketing website and order management system for web development, mobile apps, IoT solutions, and hardware sales.

## Technology Stack

- **Framework**: Next.js 15.3.4 with App Router
- **React**: Version 19 (latest)
- **TypeScript**: Full TypeScript support
- **Styling**: Tailwind CSS v4 (latest)
- **Database**: Supabase (PostgreSQL with real-time features)
- **Storage**: AWS S3 integration for file uploads
- **Email**: EmailJS for contact forms
- **Animations**: Framer Motion for UI animations
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.jsx          # Homepage with company showcase
│   ├── admin/            # Admin dashboard (protected)
│   ├── web-development/  # Service pages
│   ├── track-order/      # Order tracking system
│   └── [other-pages]/    # About, Contact, Services, etc.
├── components/           # Reusable UI components
│   ├── Navigation.jsx    # Main site navigation
│   ├── QuoteForm.tsx    # Order/quote form
│   └── EmailJSInit.tsx  # Email service initialization
└── lib/                 # Utility functions and configurations
    ├── supabase.ts      # Database client and types
    ├── utils.ts         # Helper functions
    ├── storage.ts       # File upload handling
    ├── email.ts         # Email service functions
    └── auth.ts          # Authentication utilities
```

### Database Schema (Supabase)
The application uses a PostgreSQL database with these main entities:
- **quotes**: Order requests with pricing and status
- **quote_details**: Extended project information and file uploads  
- **contacts**: Customer contact information
- **referrals**: Customer referral tracking

Key features:
- Row Level Security (RLS) enabled
- Automated order ID generation via database functions
- Real-time subscriptions for live updates
- File storage integration

### Core Application Flow
1. **Lead Generation**: Homepage showcases services and drives traffic to quote form
2. **Quote System**: Multi-step form captures project requirements and generates unique order IDs
3. **Order Tracking**: Customers can track their order status using generated IDs
4. **Admin Management**: Protected admin interface for managing quotes and orders
5. **File Handling**: Secure S3 file uploads with Supabase integration

## Common Development Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Environment Variables Required
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET_NAME=your_s3_bucket
AWS_REGION=your_aws_region
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Database Operations
```bash
# Apply database migrations (run SQL files in supabase/ directory)
# Connect to Supabase dashboard or use Supabase CLI

# Key SQL files:
# - supabase/schema.sql - Initial database schema
# - supabase/run-migrations.sql - Schema updates
# - supabase/add-order-sequences.sql - Order ID generation
```

## Key Code Patterns

### Order ID Generation
The system generates unique order IDs in format: `TDS-QT-YYYYMMDD-XXXXX`
- Uses Supabase RPC function `get_next_order_number()`
- Falls back to random number if database call fails
- Implemented in `src/lib/utils.ts`

### Form Handling
Quote forms use multi-step approach with:
- Client-side validation
- File upload to S3 via presigned URLs
- Database insertion with foreign key relationships
- Email notifications via EmailJS

### Navigation & Routing
- Dynamic navigation with active state detection
- Mobile-responsive with slide-out menu
- Admin routes are conditionally hidden
- Uses Next.js App Router with TypeScript paths (`@/` alias)

### State Management
- React hooks for local state
- Supabase real-time subscriptions for live data
- No global state management library (uses prop drilling and context where needed)

## Development Guidelines

### Styling Approach
- Tailwind CSS v4 with component-based approach
- Framer Motion for consistent animations
- Responsive design with mobile-first approach
- Custom color scheme based on blue/cyan gradients

### Database Interactions
- Use TypeScript interfaces defined in `supabase.ts`
- Always handle RLS policies when querying data
- Implement proper error handling for database operations
- Use Supabase real-time features for live updates

### File Upload Pattern
1. Generate presigned URL from S3
2. Upload directly to S3 from client
3. Store file URL in Supabase
4. Handle upload progress and error states

### Security Considerations
- All database tables have RLS enabled
- File uploads use presigned URLs with expiration
- Public read access only for order tracking
- Admin routes should implement proper authentication

## Testing

Currently no automated testing framework is configured. When implementing tests, consider:
- Unit tests for utility functions in `lib/`
- Integration tests for database operations
- E2E tests for quote submission and tracking flows

## Deployment

This is a standard Next.js application that can be deployed to:
- Vercel (recommended for Next.js apps)
- AWS Amplify
- Netlify
- Any platform supporting Node.js applications

Ensure all environment variables are configured in your deployment platform.