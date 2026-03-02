# Qucoon Studio Rentals

## Overview
Premium studio rental website for Qucoon Studio located at Churchgate Tower II, Victoria Island, Lagos, Nigeria. Features training facilities, meeting rooms, seminar halls, and studio equipment rentals.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js API
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Dark theme with warm gold accent (Plus Jakarta Sans + Playfair Display)

## Pages
- `/` - Landing page with hero, services, rooms showcase, team, CTA
- `/rooms` - Detailed facilities page with all three rooms
- `/book` - Multi-step booking form (room selection, event details, contact info, review)
- `/contact` - Contact form + team directory + address info

## Rooms
1. **Clinton Training Room** - 50 seats, training facility
2. **Obama Seminar Room** - 16 seats, seminars & workshops
3. **King's Space** - 5 seats, executive meetings

## Data Models
- `bookings` - Room reservation requests with contact info, room, date, layout, equipment
- `contactInquiries` - General contact form submissions

## Key Files
- `shared/schema.ts` - Database schema and Zod validation
- `server/routes.ts` - API routes (/api/bookings, /api/contact)
- `server/storage.ts` - Database operations with Drizzle
- `client/src/lib/rooms.ts` - Room data and types
- `client/src/components/navigation.tsx` - Top navigation bar
- `client/src/components/footer.tsx` - Site footer
- `client/src/components/theme-provider.tsx` - Dark/light theme toggle
