# Vacation Reality Check - Real Travel Pricing Tool

Get the real cost of any vacation destination in seconds. Upload travel photos from Instagram, TikTok, or anywhere and get accurate pricing including flights, hotels, food, activities, and hidden fees.

## What it does

- **Upload any travel photo** - AI identifies the destination automatically
- **Get real pricing** - Flights, hotels, food, activities, transport, fees
- **Customize your trip** - Adjust dates, travelers, preferences
- **Save money** - Find cheaper alternatives and travel tips
- **No hidden fees** - See the true total cost upfront

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Authentication**: Kinde Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe (one-time $14.99 lifetime access)
- **AI/ML**: Image recognition for destination detection
- **APIs**: Flight, hotel, and travel data integration

## Features

- 🌐 Next.js App Router
- 🔐 Kinde Authentication
- 📧 Passwordless Auth
- 🔑 OAuth (Google and GitHub)
- 💿 Supabase Database
- 🎨 Styling with Tailwind CSS and shadcn/ui
- 💵 Stripe for payment handling
- 🪝 Stripe Webhooks
- 🚀 Deployment ready for Vercel

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Set up Supabase database (see below)
5. Start development server: `npm run dev`

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Kinde Auth
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=your_kinde_issuer_url

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL from `supabase-setup.sql` to create the tables
4. Copy your project URL and anon key to your environment variables

## Database Schema

The app uses three main tables:

- **users**: User profiles and payment status
- **vacation_searches**: User's vacation search history
- **saved_destinations**: User's saved destinations

## Pricing

- **One-time payment**: $14.99
- **Lifetime access**: No recurring fees
- **Unlimited searches**: Use as much as you want
- **All features included**: No premium tiers

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
