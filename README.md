# AMPLION - AI Automation Developer Platform

A modern, full-featured business website for AMPLION, an AI automation developer specializing in business intelligence solutions. Built with React, TypeScript, and Supabase, featuring a complete e-commerce flow, lead generation quiz, and analytics tracking.

## Overview

AMPLION is a professional web application designed to showcase AI automation services, manage product sales, and generate business leads through an interactive quiz system. The platform features a sleek dark theme with cyan and orange accent colors, smooth animations, and a fully responsive design.

## Core Features

### Public-Facing Features
- **Hero Landing Page**: Eye-catching hero section with animated gradient backgrounds and call-to-action buttons
- **Services Showcase**: Four main service offerings (Website Development, Workflow Automation, AI-Powered Creative, Managed Systems)
- **Benefits Section**: Highlights key value propositions for potential clients
- **FAQ Section**: Accordion-style frequently asked questions using Radix UI
- **Portfolio/Shop Page**: Browse and purchase AI automation solutions and services
- **Interactive Quiz**: Lead generation tool that captures user information and business needs
- **Shopping Cart**: Full cart functionality with item management
- **Checkout Flow**: Complete purchase process with form validation

### Business Features
- **Email Subscriber Collection**: Newsletter signup functionality
- **Quiz Response Tracking**: Captures detailed quiz responses for lead qualification
- **Order Management**: Complete order processing and tracking
- **Analytics Events**: Custom analytics tracking for user interactions
- **Discount Code System**: Apply promotional codes at checkout

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon system
- **React Hook Form** - Form state management and validation
- **React Hot Toast** - Toast notifications
- **TanStack Query** - Server state management

### Backend & Database
- **Supabase** - PostgreSQL database with built-in features:
  - Real-time subscriptions
  - Row Level Security (RLS)
  - RESTful API
  - Authentication ready (not currently implemented)

### UI Components
- **Radix UI** - Accessible component primitives:
  - Accordion (FAQ section)
  - Dialog (Quiz modal)

## Project Structure

```
amplion/
├── public/
│   └── Sleek Circular Design for AMPLION (2).png  # Logo
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── BenefitsSection.tsx    # Key benefits showcase
│   │   │   ├── FAQSection.tsx         # Frequently asked questions
│   │   │   ├── HeroSection.tsx        # Landing hero with CTA
│   │   │   └── ServicesSection.tsx    # Services grid display
│   │   ├── layout/
│   │   │   ├── AnnouncementBanner.tsx # Top orange banner
│   │   │   ├── Footer.tsx             # Site footer
│   │   │   └── Header.tsx             # Navigation header
│   │   ├── portfolio/
│   │   │   └── ProductCard.tsx        # Product display card
│   │   ├── quiz/
│   │   │   └── QuizModal.tsx          # Lead generation quiz
│   │   └── ui/
│   │       └── Button.tsx             # Reusable button component
│   ├── context/
│   │   └── CartContext.tsx            # Shopping cart state
│   ├── lib/
│   │   ├── analytics.ts               # Analytics tracking utilities
│   │   └── supabase.ts                # Supabase client setup
│   ├── pages/
│   │   ├── CartPage.tsx               # Shopping cart view
│   │   ├── CheckoutPage.tsx           # Checkout form
│   │   ├── HomePage.tsx               # Main landing page
│   │   ├── OrderSuccessPage.tsx       # Order confirmation
│   │   ├── PortfolioPage.tsx          # Product catalog
│   │   └── QuizResultPage.tsx         # Quiz submission success
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   ├── App.tsx                        # Root app component
│   ├── main.tsx                       # Application entry point
│   └── index.css                      # Global styles
├── supabase/
│   └── migrations/                    # Database schema migrations
└── [config files]
```

## Database Schema

### Tables

#### `subscribers`
Newsletter email collection
- `id` (uuid, PK)
- `email` (text, unique)
- `created_at` (timestamptz)

#### `quiz_responses`
Lead generation quiz submissions
- `id` (uuid, PK)
- `name`, `email`, `company`, `phone`
- `business_type`, `automation_interest`, `budget_range`
- `timeline`, `specific_needs`
- `created_at` (timestamptz)

#### `products`
Product catalog for e-commerce
- `id` (uuid, PK)
- `name`, `slug`, `description`, `short_description`
- `price` (numeric)
- `features` (jsonb array)
- `demo_video_url`, `thumbnail_url`
- `category`, `is_active`, `sort_order`
- `created_at`, `updated_at`

#### `discount_codes`
Promotional discount system
- `id` (uuid, PK)
- `code` (text, unique)
- `discount_percent` (integer)
- `is_active` (boolean)
- `expires_at`, `created_at`

#### `orders`
Order management and tracking
- `id` (uuid, PK)
- `customer_name`, `customer_email`, `customer_phone`
- `items` (jsonb array of products)
- `subtotal`, `discount`, `total` (numeric)
- `discount_code_used` (text)
- `status` (text: pending/completed/cancelled)
- `created_at`, `updated_at`

#### `analytics_events`
Custom event tracking
- `id` (uuid, PK)
- `event_name`, `event_type`
- `page_url`, `referrer`
- `user_agent`, `ip_address`
- `metadata` (jsonb)
- `created_at`

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- **Public read access**: subscribers (none), quiz_responses (none), products (active only), discount_codes (none), orders (none), analytics_events (none)
- **Public write access**: subscribers (insert only), quiz_responses (insert only), orders (insert only), analytics_events (insert only)
- **Admin access**: Full CRUD on all tables for authenticated users with admin role

## Design System

### Color Palette
```css
Primary Colors:
- Cyan: #00E5FF (primary accent, links, highlights)
- Orange: #FF6B35 (CTA buttons, important actions)
- Yellow: #FFD93D (energy accents)

Background Colors:
- Navy: #1A2F3D (headers, cards, dark sections)
- Deep Background: #0D1B24 (darkest backgrounds, hero)

Text Colors:
- White: #FFFFFF (primary text on dark backgrounds)
- Gray-300: Light gray (secondary text)
- Gray-400: Medium gray (tertiary text)
- Gray-600: Dark gray (text on light backgrounds)
```

### Typography
- **Headings**: Space Grotesk font family
- **Body**: Inter font family
- **Responsive sizing**: Mobile-first with sm/md/lg breakpoints

### Animations
- **Framer Motion**: Page transitions, scroll reveals, hover effects
- **Custom Keyframes**: pulse-glow, fade-in-up, slide-in effects
- **Smooth Transitions**: 300ms duration with ease-in-out timing

### Component Patterns
- **Button Variants**: primary (orange), outline (transparent with border)
- **Button Sizes**: sm, md, lg
- **Cards**: Gradient backgrounds with cyan borders and glow effects
- **Hover States**: Scale transforms, color shifts, glow shadows

## Key Functionality

### Cart System
The cart is managed through React Context (`CartContext.tsx`) with the following capabilities:
- Add items to cart with quantity
- Update item quantities
- Remove items from cart
- Calculate total price
- Persist across page navigation (session-based)

### Quiz Flow
1. User clicks CTA on hero section
2. Modal opens with multi-step form
3. Collects business information and automation needs
4. Submits to Supabase `quiz_responses` table
5. Redirects to success page with unique ID
6. Tracks analytics event

### Checkout Process
1. Review cart items
2. Apply discount code (optional)
3. Fill customer information form
4. Submit order to Supabase `orders` table
5. Redirect to order success page
6. Clear cart

### Analytics Tracking
Custom analytics system tracks:
- **Page Views**: Home page, portfolio, cart, checkout
- **Click Events**: CTAs, buttons, links with element types
- **User Interactions**: Quiz submissions, purchases, form completions

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The current configuration connects to:
- **Supabase URL**: https://vnwgiwsrupmzrzrjslsm.supabase.co
- **Anon Key**: [See .env file]

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd amplion
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy .env.example to .env and update with your Supabase credentials
cp .env.example .env
```

4. **Run database migrations**
All migrations are located in `supabase/migrations/`. Apply them through the Supabase dashboard or CLI.

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory. The build includes:
- Minified JavaScript and CSS
- Tree-shaken dependencies
- Optimized assets
- Source maps for debugging

## Deployment Considerations

### Environment Setup
- Set environment variables in your hosting platform
- Ensure Supabase project is in production mode
- Configure CORS settings in Supabase for your domain

### Hosting Options
- **Vercel**: Automatic deployment from Git with zero configuration
- **Netlify**: Simple drag-and-drop or Git-based deployment
- **Cloudflare Pages**: Fast global CDN with Git integration
- **AWS Amplify**: Full-stack deployment with AWS integration

### Performance Tips
- Enable gzip/brotli compression
- Configure CDN caching for static assets
- Use Supabase connection pooling for high traffic
- Implement image optimization for logo and product images

## Future Enhancements

### Potential Features
- **Authentication System**: User accounts and login
- **Admin Dashboard**: Manage products, orders, and content
- **Email Automation**: Welcome emails, order confirmations
- **Payment Integration**: Stripe or PayPal checkout
- **Blog/Content**: SEO-optimized content management
- **Live Chat**: Customer support integration
- **Multi-language**: Internationalization support
- **Product Reviews**: Customer testimonials and ratings
- **Advanced Analytics**: Google Analytics or Mixpanel integration

### Technical Improvements
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Storybook**: Component documentation
- **Performance Monitoring**: Sentry or LogRocket
- **CI/CD Pipeline**: Automated testing and deployment
- **SEO Optimization**: Meta tags, sitemap, robots.txt
- **Accessibility**: WCAG 2.1 AA compliance

## Contributing

This is a production website for AMPLION. For contributions or modifications, please follow these guidelines:

1. Maintain the existing design system and color palette
2. Follow TypeScript best practices and type safety
3. Ensure all new features are responsive (mobile-first)
4. Add appropriate RLS policies for any new database tables
5. Test thoroughly before deploying
6. Update this README with any significant changes

## License

Proprietary - All rights reserved by AMPLION

## Support

For questions or issues, contact AMPLION support through the website contact form or quiz submission.

---

**Built with excellence by AMPLION - Amplifying Business Intelligence Through AI Automation**
