# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
pnpm dev              # Start development server with Turbo
pnpm build            # Build production bundle
pnpm start            # Start production server
pnpm preview          # Build and start production server
pnpm check            # Run linter and type checker
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix linting issues
pnpm typecheck        # Run TypeScript compiler without emitting files
pnpm format:check     # Check code formatting
pnpm format:write     # Format code with Prettier
```

### Database Operations
```bash
pnpm db:generate      # Generate Drizzle migrations from schema
pnpm db:migrate       # Run pending migrations
pnpm db:push          # Push schema changes directly to database (dev only)
pnpm db:studio        # Open Drizzle Studio GUI
```

### Performance & Analysis
```bash
pnpm scan             # Run dev server with React performance scanner
ANALYZE=true pnpm build  # Build with bundle analyzer
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.2.3 (App Router with React Server Components)
- **Database**: PostgreSQL via Neon serverless + Drizzle ORM v0.41.0
- **Authentication**: Clerk v6.35.3 with role-based access control
- **Styling**: Tailwind CSS v4.0.15 with shadcn/ui components
- **Monitoring**: Sentry (errors) + PostHog (analytics)
- **Language**: TypeScript with strict mode enabled

### Project Structure
```
src/
├── app/                      # Next.js App Router
│   ├── _components/          # Shared app components
│   ├── admin/                # Admin dashboard with role management
│   ├── events/               # Events listing page
│   ├── links/                # Links listing page
│   ├── onboarding/           # User onboarding flow
│   └── api/uploadthing/      # File upload API route
├── _components/ui/           # shadcn/ui component library
├── server/
│   ├── db/
│   │   ├── index.ts          # Database client
│   │   └── schema.ts         # Drizzle schema definitions
│   └── queries.ts            # Server-only database queries
├── lib/
│   ├── roles.ts              # Role checking utilities
│   └── utils.ts              # Shared utility functions
├── middleware.ts             # Clerk auth + onboarding gate
└── env.js                    # Type-safe environment validation
```

### Path Aliases
Use `~/` as an alias for `./src/` in imports (e.g., `import { db } from "~/server/db"`).

## Database Schema

The database uses a table prefix `ssamembers_` for all tables (configured in `drizzle.config.ts`).

### Tables
- **links**: Member resource links
  - Fields: `id`, `name`, `url`, `tag`, `createdAt`, `updatedAt`
  - Indexed on `name`

- **events**: SSA events
  - Fields: `id`, `name`, `imageUrl`, `location`, `date`, `createdAt`, `updatedAt`
  - Indexed on `name`

### Query Pattern
All database queries are in `src/server/queries.ts` and use server-only imports. Server components call these directly without an API layer:

```typescript
import { getRecentEvents } from "~/server/queries";

export default async function EventsPage() {
  const events = await getRecentEvents(10);
  // ...
}
```

## Authentication & Authorization

### Authentication Flow
1. **Middleware** (`src/middleware.ts`) runs on all non-static routes
2. Unauthenticated users → redirected to `/sign-in` with return URL
3. Authenticated but incomplete onboarding → redirected to `/onboarding`
4. Public routes: `/sign-in`, `/sign-up`, `/onboarding`

### Role System
Roles are stored in Clerk's `sessionClaims.metadata.role`:
- **admin**: Full access to admin dashboard, can manage user roles
- **moderator**: Elevated permissions (implementation varies)
- **member** (default): Standard user access

Check roles server-side using:
```typescript
import { checkRole } from "~/lib/roles";

if (!(await checkRole("admin"))) {
  redirect("/");
}
```

### Onboarding Gate
The `onboardingComplete` flag in `sessionClaims.metadata` gates app access. Users must complete onboarding before accessing any protected routes.

### User Metadata Schema
Custom session claims include:
```typescript
metadata: {
  role?: "admin" | "moderator"
  onboardingComplete?: boolean
  instrument?: string
  major?: string
  graduationYear?: number
}
```

## Component Patterns

### Server vs Client Components
- **Default**: All components are Server Components unless marked `"use client"`
- **Server Components**: Data fetching, direct database queries, authentication checks
- **Client Components**: Interactive UI (sidebar, theme switcher, forms with state)

### Server Actions
Used for form submissions and mutations (see `src/app/admin/_actions.ts`):
```typescript
"use server"

export async function setRole(formData: FormData) {
  // Validate auth, extract data, perform action
  await clerkClient().users.updateUser(userId, { ... });
  revalidatePath("/admin");
}
```

### Search Pattern
Pages with search use URL params and are marked `export const dynamic = "force-dynamic"`:
```typescript
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = await searchLinks(q);
  // ...
}
```

## Styling Guidelines

### Tailwind CSS v4
This project uses Tailwind v4 with the new `@theme` directive syntax. Custom theme values are defined in `src/styles/globals.css` using CSS variables in oklch color space.

### Theme Support
- Light/dark mode via `next-themes`
- Theme toggle in user menu
- Clerk components styled with shadcn theme
- Use `dark:` prefix for dark mode variants

### Component Library
shadcn/ui components in `src/_components/ui/`. All components use the `cn()` utility for class merging:
```typescript
import { cn } from "~/lib/utils";

<div className={cn("base-classes", conditionalClasses)} />
```

## Monitoring & Analytics

### Sentry
- Auto-captures errors in Node.js and Edge runtimes
- Tunneled through `/monitoring` route to bypass ad-blockers
- Source maps uploaded automatically on build
- Org: `daniel-xu-wv`, Project: `ssa-dashboard`

### PostHog
- Product analytics and feature flags
- Reverse proxy through `/relay-uY0p` to bypass ad-blockers
- Users identified by Clerk ID with synced email/name
- Provider in `src/app/_analytics/provider.tsx`

## Environment Variables

Environment variables are validated at build time using `@t3-oss/env-nextjs` in `src/env.js`.

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string (Neon serverless)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key
- `UPLOADTHING_TOKEN`: UploadThing API token
- `SENTRY_AUTH_TOKEN`: Sentry auth token for source maps
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog project key
- `NEXT_PUBLIC_POSTHOG_HOST`: PostHog host URL

Copy `.env.example` to `.env` and populate with actual values.

## Important Configuration Files

### next.config.js
- Sentry integration with `withSentryConfig`
- Bundle analyzer via `withBundleAnalyzer`
- PostHog URL rewrites for `/relay-uY0p/*`
- UploadThing remote image patterns
- **Note**: TypeScript/ESLint errors are ignored during builds but checked separately via `pnpm check`

### drizzle.config.ts
- Schema: `src/server/db/schema.ts`
- Table filter: `ssamembers_*`
- Uses validated env vars from `src/env.js`

### tsconfig.json
- Strict mode enabled with `noUncheckedIndexedAccess`
- Target: ES2022
- Module resolution: Bundler
- Path alias: `~/*` → `./src/*`

## Common Development Workflows

### Adding a New Database Table
1. Define schema in `src/server/db/schema.ts`
2. Run `pnpm db:generate` to create migration
3. Run `pnpm db:push` (dev) or `pnpm db:migrate` (prod)
4. Add query functions in `src/server/queries.ts`

### Creating a New Protected Route
1. Create page in `src/app/[route]/page.tsx`
2. Add role check if needed: `await checkRole("admin")`
3. Middleware automatically protects non-public routes

### Adding Admin Features
1. Place in `src/app/admin/`
2. Add role check at page level
3. Use Server Actions for mutations in `_actions.ts`
4. Call `revalidatePath()` after mutations

### Implementing Search
1. Mark page with `export const dynamic = "force-dynamic"`
2. Accept `searchParams` prop
3. Use query functions from `src/server/queries.ts`
4. Search component updates URL params (see `src/app/_components/search.tsx`)